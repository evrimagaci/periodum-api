import express, { Application, Response } from "express";
import {loggingMiddleware} from "./middlewares/logging";
import routing from "./routes";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.get("/", (_, res: Response) => {
	res.status(200).send("Hello Periodum API!");
});

app.use('/', routing);
app.use(loggingMiddleware.RequestResponseLogger);

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${PORT}`);
});
