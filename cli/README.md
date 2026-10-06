# @kad-products/cli

Internal CLI for the kad-products platform.

## Setup

```bash
pnpm install
pnpm build
```

The `kad` binary is available at `./dist/cli.js` after building, or via `pnpm dev` for local development without a build step.

## Commands

### `kad tofu view-state`

Interactively browse OpenTofu remote state stored in Cloudflare R2.

Discovers state files for the current repo (derived from `git remote get-url origin`) and lets you pick a state file, then a resource, and dumps the resource attributes to stdout.

**Required env vars:**

| Variable                  | Description           | Maps to GitHub secret            |
| ------------------------- | --------------------- | -------------------------------- |
| `KAD_CF_R2_ACCESS_KEY_ID` | R2 access key ID      | `KAD_CF_R2_ACCESS_KEY_ID_ID`     |
| `KAD_CF_R2_SECRET_KEY`    | R2 secret access key  | `TOFU_BACKEND_SECRET_ACCESS_KEY` |
| `CF_ACCOUNT_ID`           | Cloudflare account ID | `CLOUDFLARE_ACCOUNT_ID`          |

These are the same credentials used by CI workflows. You can find the values in the GitHub org secrets or in your Cloudflare dashboard under R2 → Manage R2 API tokens.

The R2 token needs **Workers R2 Storage Bucket Item Read** permission on the `kad-products-opentofu-remote-state` bucket.

**Options:**

| Flag           | Description                                           |
| -------------- | ----------------------------------------------------- |
| `--app <name>` | Override the app name (defaults to current repo name) |
| `--verbose`    | Show debug output                                     |

**Example:**

```bash
export KAD_CF_R2_ACCESS_KEY_ID=...
export KAD_CF_R2_SECRET_KEY=...
export CF_ACCOUNT_ID=...

kad tofu view-state
```
