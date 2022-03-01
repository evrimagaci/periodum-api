import { Appsignal } from '@appsignal/nodejs';
// AT THE VERY TOP OF THE ENTRYPOINT OF YOUR APPLICATION...

const appsignal = new Appsignal({
	active: process.env.NODE_ENV === 'production',
	name: 'Periodum API'
});

import express, { Application, Response } from 'express';
import { expressMiddleware, expressErrorHandler } from '@appsignal/express';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

const app: Application = express();

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, BUT BEFORE ANY ROUTES!
app.use(expressMiddleware(appsignal));

app.get('/', (_, res: Response) => {
	res.status(200).send('Hello Periodum API!');
});

app.get('/elements', async (_, res: Response) => {
	const elements = await prisma.elements.findMany();
	res.json({ data: elements });
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${PORT}`);
});

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
app.use(expressErrorHandler(appsignal));
