import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const BUCKET = 'kad-products-opentofu-remote-state';

export function createR2Client(): S3Client {
	const accessKeyId = process.env.TOFU_BACKEND_ACCESS_KEY;
	const secretAccessKey = process.env.TOFU_BACKEND_SECRET_KEY;
	const accountId = process.env.CF_ACCOUNT_ID;

	const missing = [
		!accessKeyId && 'TOFU_BACKEND_ACCESS_KEY',
		!secretAccessKey && 'TOFU_BACKEND_SECRET_KEY',
		!accountId && 'CF_ACCOUNT_ID',
	].filter(Boolean) as string[];

	if (missing.length > 0) {
		throw new Error(`Missing required env vars: ${missing.join(', ')}`);
	}

	return new S3Client({
		region: 'auto',
		endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: accessKeyId as string,
			secretAccessKey: secretAccessKey as string,
		},
	});
}

export interface StateFileEntry {
	key: string;
	label: string;
}

export async function listStateFiles(client: S3Client, appName: string): Promise<StateFileEntry[]> {
	const prefix = `${appName}/`;
	const response = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }));

	return (response.Contents ?? [])
		.filter(obj => obj.Key?.endsWith('/terraform.tfstate'))
		.map(obj => {
			const key = obj.Key as string;
			const label = key.slice(prefix.length).replace('/terraform.tfstate', '');
			return { key, label };
		});
}

export async function fetchStateFile(client: S3Client, key: string): Promise<unknown> {
	const response = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
	const body = await response.Body?.transformToString();
	if (!body) throw new Error(`Empty response for state file: ${key}`);
	return JSON.parse(body);
}
