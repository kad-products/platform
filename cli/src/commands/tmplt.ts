import type { Argv } from 'yargs';
import * as initCmd from './tmplt/init';

export const command = 'tmplt';
export const describe = 'Template management';

export function builder(yargs: Argv): Argv {
	return yargs.command(initCmd).demandCommand(1, 'You must provide a tmplt subcommand');
}

export function handler(): void {}
