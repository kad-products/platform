import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk-template';
import type { Argv } from 'yargs';
import { getOrgAndRepo } from '../../lib/git';
import { logger } from '../../logger';

export const command = 'init';
export const describe = 'Initialize a repository created from a template';

export function builder(yargs: Argv): Argv {
	return yargs;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function readFileMaybe(fullPath: string): string | null {
	if (!existsSync(fullPath)) {
		logger.warn(`File not found, skipping: ${fullPath}`);
		return null;
	}
	return readFileSync(fullPath, 'utf8');
}

function writeFileTo(cwd: string, relativePath: string, content: string): void {
	writeFileSync(join(cwd, relativePath), content, 'utf8');
	logger.log(chalk`  {green ✓} ${relativePath}`);
}

function deleteFileMaybe(cwd: string, relativePath: string): void {
	const fullPath = join(cwd, relativePath);
	if (existsSync(fullPath)) {
		rmSync(fullPath);
		logger.log(chalk`  {green ✓} ${relativePath} {dim (deleted)}`);
	}
}

export async function handler(): Promise<void> {
	let org: string;
	let repo: string;
	try {
		({ org, repo } = getOrgAndRepo());
	} catch (err) {
		logger.error((err as Error).message);
		process.exit(1);
	}

	logger.log(chalk`\nInitializing template for {cyan ${org}/${repo}}\n`);

	const description = await input({
		message: 'Repository description:',
		validate: (v: string) => v.trim().length > 0 || 'Description is required',
	});

	const siteTitle = await input({
		message: 'Site title:',
		validate: (v: string) => v.trim().length > 0 || 'Site title is required',
	});

	const dayIndex = await select<number>({
		message: 'Which day should Renovate run?',
		choices: DAYS.map((name, i) => ({ name, value: i })),
	});

	const hourStr = await input({
		message: 'Which hour (UTC, 0-23) should Renovate run?',
		validate: (v: string) => {
			const n = parseInt(v, 10);
			if (Number.isNaN(n) || n < 0 || n > 23) return 'Enter a number between 0 and 23';
			return true;
		},
	});
	const hour = parseInt(hourStr, 10);

	const cwd = process.cwd();
	logger.log('');

	// package.json
	const pkgContent = readFileMaybe(join(cwd, 'package.json'));
	if (pkgContent) {
		const pkg = JSON.parse(pkgContent) as Record<string, unknown>;
		pkg.name = `@kad-products/${repo}`;
		pkg.description = description;
		pkg.version = '0.0.0';
		writeFileTo(cwd, 'package.json', `${JSON.stringify(pkg, null, '\t')}\n`);
	}

	// wrangler.jsonc — text replace since JSONC can't be round-tripped through JSON.parse
	const wranglerContent = readFileMaybe(join(cwd, 'wrangler.jsonc'));
	if (wranglerContent) {
		writeFileTo(cwd, 'wrangler.jsonc', wranglerContent.replace('"name": "tmplt-rwsdk"', `"name": "${repo}"`));
	}

	// release.config.js
	const releaseContent = readFileMaybe(join(cwd, 'release.config.js'));
	if (releaseContent) {
		writeFileTo(
			cwd,
			'release.config.js',
			releaseContent.replace(
				`repositoryUrl: 'https://github.com/kad-products/tmplt-rwsdk'`,
				`repositoryUrl: 'https://github.com/${org}/${repo}'`,
			),
		);
	}

	// infra/github/repo.tf
	const repoTfContent = readFileMaybe(join(cwd, 'infra/github/repo.tf'));
	if (repoTfContent) {
		// Escape double quotes for HCL string literal
		const escapedDescription = description.replace(/"/g, '\\"');
		writeFileTo(
			cwd,
			'infra/github/repo.tf',
			repoTfContent.replace(/repo_description = "[^"]*"/, `repo_description = "${escapedDescription}"`),
		);
	}

	// .github/workflows/deploy-app-cloudflare.yaml — remove template guard
	const deployContent = readFileMaybe(join(cwd, '.github/workflows/deploy-app-cloudflare.yaml'));
	if (deployContent) {
		writeFileTo(
			cwd,
			'.github/workflows/deploy-app-cloudflare.yaml',
			deployContent.replace(/\n {4}# disabled here in the template repo, remove in the real repo\n {4}if: false ?/, ''),
		);
	}

	// .github/workflows/upgrade-dependencies.yaml — update renovate cron
	const upgradeContent = readFileMaybe(join(cwd, '.github/workflows/upgrade-dependencies.yaml'));
	if (upgradeContent) {
		const hourPadded = String(hour).padStart(2, '0');
		const dayName = DAYS[dayIndex];
		writeFileTo(
			cwd,
			'.github/workflows/upgrade-dependencies.yaml',
			upgradeContent.replace(
				/ {4}# Weekly on .+\n {4}- cron: '.+'/,
				`    # Weekly on ${dayName} at ${hourPadded}:00 UTC\n    - cron: '0 ${hour} * * ${dayIndex}'`,
			),
		);
	}

	// src/documents/app.tsx — update page <title>
	const appTsxContent = readFileMaybe(join(cwd, 'src/documents/app.tsx'));
	if (appTsxContent) {
		writeFileTo(cwd, 'src/documents/app.tsx', appTsxContent.replace('KAD RWSDK Template', siteTitle));
	}

	// src/layouts/Default.tsx — update welcome title
	const defaultLayoutContent = readFileMaybe(join(cwd, 'src/layouts/Default.tsx'));
	if (defaultLayoutContent) {
		writeFileTo(cwd, 'src/layouts/Default.tsx', defaultLayoutContent.replace('KAD RWSDK Template', siteTitle));
	}

	// CHANGELOG.md — delete; the new repo starts fresh
	deleteFileMaybe(cwd, 'CHANGELOG.md');

	logger.success('\nTemplate initialized successfully!');
}
