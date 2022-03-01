import { Request, Response } from 'express';
import log from '../utils/logger';
import ElementService from '../services/element.service';

class ElementController {
	service: ElementService;

	public constructor() {
		this.service = new ElementService();
	}

	getList = async (_: Request, res: Response) => {
		try {
			const elements = await this.service.listAll();
			res.json({ data: elements });
		} catch (e) {
			log.error(e);
			res
				.status(500)
				.json({ message: 'Error occured and we have been notified.' });
		}
	};
}

export default ElementController;
