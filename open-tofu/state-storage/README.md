# state-storage

OpenTofu configuration that provisions:

- The Cloudflare R2 bucket used as the remote state backend for everything else in this repo
- A Cloudflare API token scoped to that bucket for R2 access
- GitHub org secrets (`TOFU_BACKEND_ACCESS_KEY_ID`, `TOFU_BACKEND_SECRET_ACCESS_KEY`) so CI can authenticate to the backend

## Why this has to run locally

This is the classic chicken-and-egg problem: the R2 bucket that stores remote state can't be managed by a configuration that uses that bucket as its backend. It has to run locally with state stored on disk, and that state file lives only on your machine.

This also means it should **never** be wired into CI. Running it in CI would either require a separate bootstrap backend (solving nothing) or risk blowing away the bucket mid-run.

## Prerequisites

- OpenTofu >= 1.7 installed locally (`brew install opentofu`)
- A Cloudflare API token with the following account-level permissions:
  - **Workers R2 Storage Bucket Item Read** — to read bucket objects
  - **Workers R2 Storage Bucket Item Write** — to write bucket objects
  - **API Tokens Edit** — to create the scoped R2 token
- A GitHub token — see below

## GitHub token

Fine-grained PATs currently return 403 on the org secrets API even with the Organization secrets permission granted. This appears to be a GitHub limitation. See kad-products/platform#26 for investigation.

**Workaround: create a short-lived classic PAT**

1. Go to **GitHub Settings → Developer Settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Set expiration to **7 days**
4. Select scope: **`admin:org`**
5. Generate and copy the token

Use this token as `github_token` below. Revoke it from GitHub after `tofu apply` completes.

## Setup

Create `local.auto.tfvars` in this directory — it's gitignored, so it stays on your machine:

```hcl
cloudflare_account_id = "<your-account-id>"
cloudflare_api_token  = "<your-api-token>"
github_token          = "<your-classic-pat>"
```

## Running it

```bash
cd open-tofu/state-storage
tofu init
tofu plan
tofu apply
```

This creates the R2 bucket, generates a scoped API token for it, and pushes the resulting credentials directly into GitHub org secrets.

## Lost your state file?

If you no longer have the local `terraform.tfstate` (e.g. new machine, deleted by accident), the resources still exist — you just need to tell OpenTofu about them again. Run the import script:

```bash
R2_TOKEN_ID=<access-key-id> ./import-state.sh
```

`R2_TOKEN_ID` is the Access Key ID for the `opentofu-remote-state` token, visible in the Cloudflare dashboard under R2 → Manage R2 API tokens.
