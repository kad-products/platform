import type { Argv } from 'yargs';
import * as prChecksCmd from './ci/pr-checks';

export const command = 'ci';
export const describe = 'CI utilities';

export function builder(yargs: Argv): Argv {
	return yargs.command(prChecksCmd).demandCommand(1, 'You must provide a ci subcommand');
}

export function handler(): void {}
