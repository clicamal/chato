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

import type { Request, Response } from 'express';
import { Router, static as express_static } from 'express';
import { join as path_join } from 'path';

const router: Router = Router();

router.get('/', (req: Request, res: Response): void => {
	res.sendFile(path_join(__dirname, '..', '..', '..', 'src', 'public', 'html', 'index.html'));
});

router.use('/static', express_static(path_join(__dirname, '..', '..', '..', 'src', 'public', 'static')));

router.use((req: Request, res: Response): void => {
	res.redirect('/');
});

export default router;
