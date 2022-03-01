import { Express, Request, Response, NextFunction } from 'express';
import ElementController from './controllers/element.controller';
import { expressMiddleware, expressErrorHandler } from '@appsignal/express';
import { Appsignal } from '@appsignal/nodejs';

export default function (app: Express, appsignal: Appsignal) {
	// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, BUT BEFORE ANY ROUTES!
	app.use(expressMiddleware(appsignal));

	const elementController = new ElementController();

	app.get('/', (_, res: Response) => {
		res.status(200).json({ message: 'Hello from Periodum API!' });
	});

	app.get('/elements', elementController.getList);

	httpsRedirection(app);

	// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
	app.use(expressErrorHandler(appsignal));
}

function httpsRedirection(app: Express) {
	app.use(function (req: Request, res: Response, next: NextFunction) {
		if (req.get('X-Forwarded-Proto') === 'http') {
			res.redirect('https://' + req.headers.host + req.url);
		} else {
			next();
		}
	});
}
