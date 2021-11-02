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

import uniqid from 'uniqid';
import User from '@models/user';
import Message from '@models/message';

export default class Hub {
	private readonly users:  User[] = [];
	private readonly messages: Message[] = [];

	constructor () {
		setInterval(() => {
			this.messages.slice(0, this.messages.length);
		}, 5000);
	}

	public getUser (id: string): User | null {
		var result: User | null = null;

		for (let user of this.users)
			if (user.id == id) {
				result = user;
				break;
			}

		return result;
	}

	public getUsers (): User[] {
		return this.users;
	}

	public addUser (user: User): void {
		this.users.push(user);

		this.users.slice(5);
	}

	public removeUser (id: string): void {
		var user: User | null = this.getUser(id);

		if (user) {
			let userIndex: number = this.users.indexOf(user);

			this.users.splice(userIndex, 1);
		}
	}

	public getMessage (id: string): Message | null {
		var result: Message | null = null;

		for (let message of this.messages)
			if (message.id == id) {
				result = message;
				break;
			}

		return result;
	}

	public getMessages (): Message[] {
		return this.messages;
	}

	public addMessage (message: Message): void {
		this.messages.push(message);
	}

	public removeMessage (id: string): void {
		var message: Message | null = this.getMessage(id);

		if (message) {
			let messageIndex: number = this.messages.indexOf(message);

			this.messages.splice(messageIndex, 1);
		}
	}
}
