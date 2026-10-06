import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createR2Client } from '../r2';

describe('createR2Client', () => {
	const ENV_KEYS = ['KAD_CF_R2_ACCESS_KEY_ID', 'KAD_CF_R2_SECRET_KEY', 'CF_ACCOUNT_ID'] as const;
	const saved: Partial<Record<(typeof ENV_KEYS)[number], string>> = {};

	beforeEach(() => {
		for (const key of ENV_KEYS) {
			saved[key] = process.env[key];
			delete process.env[key];
		}
	});

	afterEach(() => {
		for (const key of ENV_KEYS) {
			if (saved[key] !== undefined) {
				process.env[key] = saved[key];
			} else {
				delete process.env[key];
			}
		}
	});

	it('throws listing all missing vars when none are set', () => {
		expect(() => createR2Client()).toThrow(
			'Missing required env vars: KAD_CF_R2_ACCESS_KEY_ID, KAD_CF_R2_SECRET_KEY, CF_ACCOUNT_ID',
		);
	});

	it('throws listing only the vars that are missing', () => {
		process.env.KAD_CF_R2_ACCESS_KEY_ID = 'test-key';
		process.env.KAD_CF_R2_SECRET_KEY = 'test-secret';
		expect(() => createR2Client()).toThrow('Missing required env vars: CF_ACCOUNT_ID');
	});

	it('returns an S3Client when all vars are set', () => {
		process.env.KAD_CF_R2_ACCESS_KEY_ID = 'test-key';
		process.env.KAD_CF_R2_SECRET_KEY = 'test-secret';
		process.env.CF_ACCOUNT_ID = 'test-account';
		expect(() => createR2Client()).not.toThrow();
	});
});
