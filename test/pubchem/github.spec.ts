import { expect } from 'chai';
import GithubService from '../../src/services/github.service';

describe('GitHub API with Octokit testing', () => {
	it('should return with not error for contributors', async () => {
		const githubService = new GithubService();
		const contributors = await githubService.getContributors(
			'evrimagaci',
			'periodum'
		);

		expect(contributors).to.be.an('array');
	}).timeout(0);
});
