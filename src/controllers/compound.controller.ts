import { Request, Response } from 'express';
import CompoundService from '../services/compound.service';
import BaseController from './base.controller';
class CompoundController extends BaseController {
	service: CompoundService;

	public constructor() {
		super();
		this.service = new CompoundService();
	}

	getCompounds = async (_: Request, res: Response) => {
		try {
			const compounds = await this.service.getAll();
			return this.success(res, compounds);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};

	getCompoundById = async (req: Request, res: Response) => {
		try {
			const compoundId = Number(req.params.id);
			const compound = await this.service.getById(compoundId);
			if (compound === null) {
				return this.notfound(res, 'Compound not found');
			}

			return this.success(res, compound);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};
}

export default CompoundController;
