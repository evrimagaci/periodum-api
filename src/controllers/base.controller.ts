import { Response } from 'express';
import log from '../utils/logger';

class BaseController {
	success(res: Response, data: unknown) {
		return res.status(200).send({ data });
	}

	notfound(res: Response, message?: string) {
		return res.status(404).send({
			data: { message: message === undefined ? 'Not Found' : message }
		});
	}

	error(res: Response, error: Error, message?: string) {
		log.error(error);
		return res.status(500).send({
			data: {
				message:
					message === undefined
						? 'Error occured and we have been notified.'
						: message
			}
		});
	}
}

export default BaseController;
