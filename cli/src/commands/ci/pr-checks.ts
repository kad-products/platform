import { execSync } from 'node:child_process';
import { Octokit } from '@octokit/rest';
import chalk from 'chalk-template';
import type { ArgumentsCamelCase, Argv } from 'yargs';
import { getOrgAndRepo } from '../../lib/git';
import { logger } from '../../logger';

export const command = 'pr-checks <pr>';
export const describe = 'Show CI check runs for a pull request';

interface Options {
	pr: number;
}

export function builder(yargs: Argv): Argv<Options> {
	return yargs.positional('pr', {
		type: 'number',
		describe: 'Pull request number',
	}) as Argv<Options>;
}

function getGithubToken(): string {
	const envToken = process.env.GITHUB_TOKEN;
	if (envToken) return envToken;
	try {
		return execSync('gh auth token', { encoding: 'utf8' }).trim();
	} catch {
		throw new Error('No GitHub token found. Set GITHUB_TOKEN or run `gh auth login`.');
	}
}

function formatCheck(name: string, status: string, conclusion: string | null, nameWidth: number): string {
	const paddedName = name.padEnd(nameWidth);
	const detail = status === 'completed' ? `completed · ${conclusion ?? 'unknown'}` : status;

	if (status !== 'completed') {
		return chalk`{yellow ●  ${paddedName}  ${detail}}`;
	}
	if (conclusion === 'success' || conclusion === 'skipped') {
		return chalk`{green ✓  ${paddedName}}  {dim ${detail}}`;
	}
	return chalk`{red ✗  ${paddedName}  ${detail}}`;
}

export async function handler(argv: ArgumentsCamelCase<Options>): Promise<void> {
	let token: string;
	try {
		token = getGithubToken();
	} catch (err) {
		logger.error((err as Error).message);
		process.exit(1);
	}

	let org: string;
	let repo: string;
	try {
		({ org, repo } = getOrgAndRepo());
	} catch (err) {
		logger.error((err as Error).message);
		process.exit(1);
	}

	const octokit = new Octokit({ auth: token });

	let sha: string;
	try {
		const { data: pr } = await octokit.pulls.get({
			owner: org,
			repo,
			pull_number: argv.pr,
		});
		sha = pr.head.sha;
	} catch (err) {
		logger.error(`Failed to fetch PR #${argv.pr}: ${(err as Error).message}`);
		process.exit(1);
	}

	let checkRuns: Array<{ name: string; status: string; conclusion: string | null }>;
	try {
		const { data } = await octokit.checks.listForRef({
			owner: org,
			repo,
			ref: sha,
			per_page: 100,
		});
		checkRuns = data.check_runs;
	} catch (err) {
		logger.error(`Failed to fetch check runs: ${(err as Error).message}`);
		process.exit(1);
	}

	if (checkRuns.length === 0) {
		logger.warn(`No check runs found for PR #${argv.pr}`);
		process.exit(0);
	}

	logger.log(`\nPR #${argv.pr} — ${repo} @ ${sha.slice(0, 7)}\n`);

	const nameWidth = Math.max(...checkRuns.map(c => c.name.length));
	for (const check of checkRuns) {
		logger.log(formatCheck(check.name, check.status, check.conclusion, nameWidth));
	}
}
