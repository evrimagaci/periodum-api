import { Request, Response } from 'express';
import BaseController from './base.controller';
import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';

class GithubController extends BaseController {
	octokit: Octokit;

	public constructor() {
		super();
		this.octokit = new Octokit({
			auth: process.env.GITHUB_TOKEN,
			userAgent: 'PeriodumAPI'
		});
	}

	getContributors = async (_: Request, res: Response) => {
		try {
			const contributors: Endpoints['GET /users/{username}']['response']['data'][] =
				[];

			const { data: users }: any =
				await this.octokit.rest.repos.getContributorsStats({
					owner: 'evrimagaci',
					repo: 'periodum'
				});

			await Promise.all(
				users.map(async (e: any) => {
					const { data: user } = await this.octokit.rest.users.getByUsername({
						username: e.author.login
					});
					contributors.push({ user, total: e.total });
				})
			);

			return this.success(res, contributors);
		} catch (e) {
			return this.error(res, e as Error);
		}
	};
}

export default GithubController;
