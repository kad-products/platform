import { describe, expect, it } from 'vitest';
import { getResource, parseResources } from '../tofu-state';

describe('parseResources', () => {
	it('formats a managed resource address', () => {
		const result = parseResources({
			resources: [{ mode: 'managed', type: 'github_repository', name: 'example', instances: [] }],
		});
		expect(result[0].address).toBe('github_repository.example');
	});

	it('prefixes data resources with data.', () => {
		const result = parseResources({
			resources: [{ mode: 'data', type: 'github_user', name: 'current', instances: [] }],
		});
		expect(result[0].address).toBe('data.github_user.current');
	});

	it('prefixes module-scoped resources', () => {
		const result = parseResources({
			resources: [{ module: 'module.my_module', mode: 'managed', type: 'github_repository', name: 'example', instances: [] }],
		});
		expect(result[0].address).toBe('module.my_module.github_repository.example');
	});

	it('passes through instances', () => {
		const instances = [{ attributes: { name: 'test', id: '123' } }];
		const result = parseResources({
			resources: [{ mode: 'managed', type: 'github_repository', name: 'example', instances }],
		});
		expect(result[0].instances).toBe(instances);
	});

	it('returns empty array for empty resources list', () => {
		expect(parseResources({ resources: [] })).toEqual([]);
	});

	it('handles missing resources property', () => {
		expect(parseResources({})).toEqual([]);
	});
});

describe('getResource', () => {
	const resources = [
		{ address: 'github_repository.example', instances: [] },
		{ address: 'data.github_user.current', instances: [] },
	];

	it('returns the matching resource', () => {
		expect(getResource(resources, 'github_repository.example')).toBe(resources[0]);
	});

	it('returns undefined for an unknown address', () => {
		expect(getResource(resources, 'nonexistent')).toBeUndefined();
	});
});
