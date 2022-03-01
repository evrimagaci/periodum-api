import { appsignal } from './logger/appsignal';
import express from 'express';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

routes(app, appsignal);

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on http://localhost:${PORT}`);
});
