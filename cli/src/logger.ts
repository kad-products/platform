import { consola, LogLevels } from 'consola';

export function initLogger(verbose: boolean): void {
	consola.level = verbose ? LogLevels.verbose : LogLevels.info;
}

export { consola as logger };
