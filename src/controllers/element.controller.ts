import { Request, Response } from 'express';
import ElementService from '../services/element.service';
import BaseController from './base.controller';
class ElementController extends BaseController {
	service: ElementService;

	public constructor() {
		super();
		this.service = new ElementService();
	}

	getElements = async (_: Request, res: Response) => {
		try {
			const elements = await this.service.getAll();
			return this.success(res, elements);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};

	getElementById = async (req: Request, res: Response) => {
		try {
			const elementId = Number(req.params.id);
			const element = await this.service.getById(elementId);

			if (element === null) {
				return this.notfound(res, 'Element not found');
			}

			return this.success(res, element);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};
}

export default ElementController;
