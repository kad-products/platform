import type { Argv } from 'yargs';
import * as viewStateCmd from './tofu/view-state';

export const command = 'tofu';
export const describe = 'OpenTofu state management';

export function builder(yargs: Argv): Argv {
	return yargs.command(viewStateCmd).demandCommand(1, 'You must provide a tofu subcommand');
}

export function handler(): void {}
