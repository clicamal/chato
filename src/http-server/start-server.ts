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

import httpServer from '@http-server/index';
import startSocketServer from '@socket-server/index';
import { port } from '@http-server/config.json';

export default function startServer (): void {
	httpServer.listen(port, () => {
		console.log(`Chato Server is running on http://localhost:${ port }/.`);
	});

	startSocketServer(httpServer);
}
