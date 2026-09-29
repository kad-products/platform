import { execSync } from 'node:child_process';
import type { S3Client } from '@aws-sdk/client-s3';
import type { ArgumentsCamelCase, Argv } from 'yargs';
import { createR2Client, fetchStateFile, listStateFiles } from '../../lib/r2';
import { getResource, parseResources } from '../../lib/tofu-state';
import { logger } from '../../logger';

const BACK = '← Back';
const EXIT = 'Exit';

export const command = 'view-state';
export const describe = 'Browse OpenTofu remote state';

interface Options {
	app?: string;
}

export function builder(yargs: Argv): Argv {
	return yargs.option('app', {
		type: 'string',
		describe: 'App name (defaults to current repo name)',
	});
}

function getAppName(override?: string): string {
	if (override) return override;
	const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
	const match = remote.match(/[/:]([^/]+?)(?:\.git)?$/);
	if (!match) throw new Error(`Could not parse repo name from git remote: ${remote}`);
	return match[1];
}

export async function handler(argv: ArgumentsCamelCase<Options>): Promise<void> {
	let client: S3Client;
	try {
		client = createR2Client();
	} catch (err) {
		logger.error((err as Error).message);
		process.exit(1);
	}

	let appName: string;
	try {
		appName = getAppName(argv.app);
		logger.verbose(`Using app name: ${appName}`);
	} catch (err) {
		logger.error((err as Error).message);
		process.exit(1);
	}

	const stateFiles = await listStateFiles(client, appName);
	if (stateFiles.length === 0) {
		logger.warn(`No state files found for app "${appName}" in the remote backend.`);
		process.exit(0);
	}

	// Outer loop: pick a state file
	while (true) {
		const stateChoice = await logger.prompt('Select a state file:', {
			type: 'select',
			options: [...stateFiles.map(f => ({ label: f.label, value: f.key })), { label: EXIT, value: EXIT }],
			cancel: 'symbol',
		});

		if (typeof stateChoice === 'symbol' || stateChoice === EXIT) process.exit(0);

		let state: unknown;
		try {
			logger.verbose(`Fetching ${stateChoice}`);
			state = await fetchStateFile(client, stateChoice);
		} catch (err) {
			logger.error(`Failed to fetch state file: ${(err as Error).message}`);
			continue;
		}

		const resources = parseResources(state);
		if (resources.length === 0) {
			logger.warn('No resources found in this state file.');
			continue;
		}

		// Inner loop: pick a resource
		while (true) {
			const resourceChoice = await logger.prompt('Select a resource:', {
				type: 'select',
				options: [...resources.map(r => ({ label: r.address, value: r.address })), { label: BACK, value: BACK }],
				cancel: 'symbol',
			});

			if (typeof resourceChoice === 'symbol') process.exit(0);
			if (resourceChoice === BACK) break;

			const resource = getResource(resources, resourceChoice);
			if (!resource || resource.instances.length === 0) {
				logger.warn('No instance data found for this resource.');
				continue;
			}

			if (resource.instances.length === 1) {
				logger.log(JSON.stringify(resource.instances[0].attributes, null, 2));
			} else {
				for (const [i, instance] of resource.instances.entries()) {
					logger.log(`\n--- Instance ${i} ---`);
					logger.log(JSON.stringify(instance.attributes, null, 2));
				}
			}
		}
	}
}
