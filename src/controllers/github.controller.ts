import { Request, Response } from 'express';
import BaseController from './base.controller';
import GithubService from '../services/github.service';

class GithubController extends BaseController {
	service: GithubService;

	public constructor() {
		super();
		this.service = new GithubService();
	}

	getContributors = async (_: Request, res: Response) => {
		try {
			const contributors = await this.service.getContributors(
				'evrimagaci',
				'periodum'
			);
			return this.success(res, contributors);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};
}

export default GithubController;
