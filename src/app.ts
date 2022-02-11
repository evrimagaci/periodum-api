import { PrismaClient } from '@prisma/client'
import express, { Application, Response } from "express";

const PORT = process.env.PORT || 3000;

const app: Application = express();
const prisma = new PrismaClient();

app.get("/", (_, res: Response) => {
	res.status(200).send("Hello Periodum API!");
});

app.get('/elements', async (_, res: Response)=> {
	const elements = await prisma.elements.findMany();
	res.json({data: elements});
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${PORT}`);
});
