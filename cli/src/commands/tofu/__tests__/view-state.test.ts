import { execSync } from 'node:child_process';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAppName } from '../view-state';

vi.mock('node:child_process', () => ({
	execSync: vi.fn(),
}));

describe('getAppName', () => {
	beforeEach(() => {
		vi.mocked(execSync).mockReset();
	});

	it('returns the override directly when provided', () => {
		expect(getAppName('my-app')).toBe('my-app');
	});

	it('parses the repo name from an HTTPS GitHub URL', () => {
		vi.mocked(execSync).mockReturnValue('https://github.com/org/my-repo.git\n' as never);
		expect(getAppName()).toBe('my-repo');
	});

	it('parses the repo name from an SSH GitHub URL', () => {
		vi.mocked(execSync).mockReturnValue('git@github.com:org/my-repo.git\n' as never);
		expect(getAppName()).toBe('my-repo');
	});

	it('parses a URL without a .git suffix', () => {
		vi.mocked(execSync).mockReturnValue('https://github.com/org/my-repo\n' as never);
		expect(getAppName()).toBe('my-repo');
	});

	it('throws on an unrecognizable remote URL', () => {
		vi.mocked(execSync).mockReturnValue('not-a-url\n' as never);
		expect(() => getAppName()).toThrow('Could not parse repo name from git remote');
	});
});
