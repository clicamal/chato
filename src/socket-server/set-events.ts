// Copyright (C) 2021  Tarcísio J. Santana Rodrigues

// This file is part of Chato.

// Chato is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Chato is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import type { Socket } from 'socket.io';
import type { UserData, MessageData } from '@socket-server/index';

import Hub from '@hub';
import User from '@models/user';
import Message from '@models/message';

const hub: Hub = new Hub();

export default function setEvents (socket: Socket): void {
	var connection: User = new User('');

	socket.on('enter-hub', (data: UserData): void => {
		connection = new User(data.name);
		hub.addUser(connection);

		socket.emit('user-joined-the-hub', { message: 'You have joined the hub.' });
		socket.broadcast.emit('user-joined-the-hub', data);
	});

	socket.on('get-users', (): void => {
		var users: User[] = hub.getUsers();

		socket.emit('get-users-result', users);
	});

	socket.on('send-message', (data: MessageData): void => {
		var message: Message = new Message(connection, data.text);
		hub.addMessage(message);

		socket.emit('new-message', message);
		socket.broadcast.emit('new-message', message);
	});

	socket.on('get-messages', (): void => {
		var messages: Message[] = hub.getMessages();

		socket.emit('get-messages-result', messages);
	});

	socket.on('delete-message', (data: { id: string }): void => {
		var message: Message | null = hub.getMessage(data.id);

		if (message?.sender.id == connection.id) {
			hub.removeMessage(message.id);

			socket.emit('message-deleted', message.id);
			socket.broadcast.emit('message-deleted', message.id);
		}
	});

	socket.on('disconnect', (): void => {
		hub.removeUser(connection.id);

		socket.emit('user-disconnected', connection);
		socket.broadcast.emit('user-disconnected', connection);
	});
}
