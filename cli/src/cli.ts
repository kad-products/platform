#!/usr/bin/env node
import chalk from 'chalk-template';
import yargs, { type ArgumentsCamelCase, type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as ciCmd from './commands/ci';
import * as tmpltCmd from './commands/tmplt';
import * as tofuCmd from './commands/tofu';
import { initLogger, logger } from './logger';

// Filter out standalone '--' that pnpm/npm might add
const args = hideBin(process.argv).filter(arg => arg !== '--');

yargs(args)
	.scriptName('kad')
	.usage('$0 <command> [options]')
	.strict()
	.command(ciCmd)
	.command(tmpltCmd)
	.command(tofuCmd)
	.option('verbose', {
		type: 'boolean',
		describe: 'Enable verbose output',
		default: false,
		global: true,
	})
	.middleware([
		(argv: ArgumentsCamelCase<{ verbose: boolean }>): void => {
			initLogger(argv.verbose ?? false);
		},
	])
	.recommendCommands()
	.demandCommand(1, chalk`{yellow You must provide a command}`)
	.fail((msg: string | undefined, err: Error | undefined, yargs: Argv) => {
		if (err) {
			logger.error(chalk`\n⚠️  ${err.message}`);
			process.exit(1);
		}
		if (msg) {
			logger.error(chalk`\n⚠️  ${msg}\n`);
			yargs.showHelp();
			process.exit(1);
		}
	})
	.help()
	.alias('h', 'help')
	.version()
	.alias('v', 'version')
	.parse();
