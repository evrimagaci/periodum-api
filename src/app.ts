import express, { Application, Response } from "express";
import {monitorService} from "./monitoring";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(monitorService.RegisterRequestCounter);

app.get("/", (_, res: Response) => {
	res.status(200).send("Hello Periodum API!");
});


app.get('/metrics', async (_, res) => {
	res.setHeader('Content-Type', monitorService.register.contentType);
	res.send(await monitorService.register.metrics());
});

app.get('/slow', async (_, res) => {
	// Generate number between 3-6, then delay by a factor of 1000 (miliseconds)
	const delaySeconds = Math.floor(Math.random() * (6 - 3)) + 3
	await new Promise(res => setTimeout(res, delaySeconds * 1000))
	res.send('Slow url accessed!');
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${PORT}`);
});
