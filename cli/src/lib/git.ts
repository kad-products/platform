import { execSync } from 'node:child_process';

export interface OrgRepo {
	org: string;
	repo: string;
}

export function getOrgAndRepo(): OrgRepo {
	const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
	const match = remote.match(/[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
	if (!match) throw new Error(`Could not parse org/repo from git remote: ${remote}`);
	return { org: match[1], repo: match[2] };
}
