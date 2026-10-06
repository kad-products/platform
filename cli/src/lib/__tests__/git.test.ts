import { execSync } from 'node:child_process';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getOrgAndRepo } from '../git';

vi.mock('node:child_process', () => ({
	execSync: vi.fn(),
}));

describe('getOrgAndRepo', () => {
	beforeEach(() => {
		vi.mocked(execSync).mockReset();
	});

	it('parses org and repo from an HTTPS GitHub URL', () => {
		vi.mocked(execSync).mockReturnValue('https://github.com/kad-products/my-repo.git\n' as never);
		expect(getOrgAndRepo()).toEqual({ org: 'kad-products', repo: 'my-repo' });
	});

	it('parses org and repo from an SSH GitHub URL', () => {
		vi.mocked(execSync).mockReturnValue('git@github.com:kad-products/my-repo.git\n' as never);
		expect(getOrgAndRepo()).toEqual({ org: 'kad-products', repo: 'my-repo' });
	});

	it('parses a URL without a .git suffix', () => {
		vi.mocked(execSync).mockReturnValue('https://github.com/kad-products/my-repo\n' as never);
		expect(getOrgAndRepo()).toEqual({ org: 'kad-products', repo: 'my-repo' });
	});

	it('throws on an unrecognizable remote URL', () => {
		vi.mocked(execSync).mockReturnValue('not-a-url\n' as never);
		expect(() => getOrgAndRepo()).toThrow('Could not parse org/repo from git remote');
	});
});
