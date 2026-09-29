interface RawResource {
	module?: string;
	mode: 'managed' | 'data';
	type: string;
	name: string;
	instances: Array<{ attributes: Record<string, unknown> }>;
}

interface RawState {
	resources: RawResource[];
}

export interface TofuResource {
	address: string;
	instances: Array<{ attributes: Record<string, unknown> }>;
}

function formatAddress(resource: RawResource): string {
	const modulePrefix = resource.module ? `${resource.module}.` : '';
	const dataPrefix = resource.mode === 'data' ? 'data.' : '';
	return `${modulePrefix}${dataPrefix}${resource.type}.${resource.name}`;
}

export function parseResources(state: unknown): TofuResource[] {
	const raw = state as RawState;
	return (raw.resources ?? []).map(resource => ({
		address: formatAddress(resource),
		instances: resource.instances ?? [],
	}));
}

export function getResource(resources: TofuResource[], address: string): TofuResource | undefined {
	return resources.find(r => r.address === address);
}
