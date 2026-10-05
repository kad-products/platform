# KAD Platform Initial Resources

OpenTofu configuration that solves the bootstrap chicken-and-egg: it creates the resources that everything else in this org depends on, using credentials that only ever exist locally.

## What this manages

- **R2 bucket** — the remote state backend used by all other OpenTofu configurations in this org
- **Cloudflare Account Token** — Cloudflare account token used by CI for deploying workers and managing infrastructure via OpenTofu
- **GitHub org secrets** — pushes the above credentials directly into GitHub so CI can use them without manual intervention

## Why this must run locally

Two reasons:

1. **State can't live in the thing being created.** The R2 bucket that holds remote state for everything else can't also hold the state for the config that created it. This configuration uses local state only, stored in `terraform.tfstate` on your machine.

2. **There is no prior token to bootstrap from.** Every other OpenTofu configuration in this org runs in CI using the `kad-workflow-automation` account token. But that token is created here. Something has to go first, and that something is a human running this locally.

This config should **never** run in CI.

## The initial tokens

### Cloudflare user token

This is a personal API token created under your Cloudflare user account (not an account token). It runs the TF providers in `main.tf` and needs enough permissions to create what's defined here.

**Where it lives:** `local.auto.tfvars` as `cloudflare_api_token`. This file is gitignored and stays on your machine.

**Required permissions:**

| Scope   | Permission               | Why                                                 |
| ------- | ------------------------ | --------------------------------------------------- |
| Account | Account API Tokens: Edit | Creates the `kad-workflow-automation` account token |
| Account | Cloudflare R2: Edit      | Creates the R2 bucket                               |
| Account | Account Settings: Read   | Required to look up permission group IDs at runtime |

Create it at [**Cloudflare Dashboard → My Profile → API Tokens → Create Token**](https://dash.cloudflare.com/profile/api-tokens).

### GitHub classic PAT

Used to write the org-level GitHub Actions secrets. Fine-grained PATs do not work for org secrets — see [kad-products/platform#26](https://github.com/kad-products/platform/issues/26). Use a classic PAT instead.

**Where it lives:** `local.auto.tfvars` as `github_token`. Gitignored.

**Required scope:** `admin:org`

Because this token has significant org-level access, create it with a short expiration (7 days is enough), and revoke it from GitHub after `tofu apply` completes.

Create it at [**GitHub Settings → Developer Settings → Personal access tokens → Tokens (classic)**](https://github.com/settings/tokens).

## Setup

Create `local.auto.tfvars` in this directory (gitignored):

```hcl
cloudflare_account_id = "<your-account-id>"
cloudflare_api_token  = "<your-cloudflare-user-token>"
github_token          = "<your-classic-pat>"
```

Then initialise and apply:

```bash
cd open-tofu/initial-resources
tofu init
tofu plan
tofu apply
```

## Token rotation

The `kad-cloudflare-token` account token uses a rolling expiry: it's set to the first day of the month approximately three months out, recalculated on each apply. This means:

- Within any given calendar month, `tofu plan` shows no changes for this token
- When the month rolls over, `tofu plan` will show the token needs to be replaced
- Run `tofu apply` to rotate it — the new token value is automatically pushed to GitHub

Treat a dirty plan on this token as "apply soon". If you leave it until after the expiry date the token will stop working in CI.

## Lost your state file?

If you no longer have the local `terraform.tfstate` (new machine, accidental deletion), the resources still exist — you just need to re-import them. Run the import script:

```bash
CF_TOKEN_ID=<token-id> ./import-state.sh
```

`CF_TOKEN_ID` is the ID for the `kad-cloudflare-token` account token, visible in the Cloudflare dashboard under **Account → Account API Tokens**.

You will also need a fresh `local.auto.tfvars` with working credentials before running the script.
