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

import type { Server as HttpServer } from 'http';

import { Server as SocketServer, Socket } from 'socket.io';
import setEvents from '@socket-server/set-events';

export default function startSocketServer (httpServer: HttpServer): void {
	var io: SocketServer = new SocketServer(httpServer);

	io.on('connection', (socket: Socket): void => {
		console.log(`Socket connected: ${ socket.id }.`);

		setEvents(socket);

		socket.emit('connection-stabilized', { message: 'Socket connection stabilized.' });
	});

	console.log('Socket Server started.');
}

export interface UserData {
	name: string;
}

export interface MessageData {
	sender: UserData;
	text: string;
}
