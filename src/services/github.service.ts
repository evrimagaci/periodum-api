import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';

class GithubService {
	octokit: Octokit;

	public constructor() {
		this.octokit = new Octokit({
			auth: process.env.GITHUB_TOKEN,
			userAgent: 'PeriodumAPI'
		});
	}

	getContributors = async (owner: string, repo: string) => {
		const contributors: Endpoints['GET /users/{username}']['response']['data'][] =
			[];

		const { data: users }: any =
			await this.octokit.rest.repos.getContributorsStats({
				owner: owner,
				repo: repo
			});

		await Promise.all(
			users.map(async (e: any) => {
				const { data: user } = await this.octokit.rest.users.getByUsername({
					username: e.author.login
				});
				contributors.push({ user, total: e.total });
			})
		);

		return contributors;
	};
}

export default GithubService;
