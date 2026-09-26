# Apply OpenTofu

Runs `tofu init`, `tofu plan`, and `tofu apply` against the calling repo's OpenTofu configuration, using KAD Product's shared Cloudflare R2 bucket as the remote backend for state storage.

The plan is saved and passed directly to apply, so the apply step executes exactly what was planned. This also sets up a clean split point for adding an approval gate between plan and apply in the future — that would require splitting this into two jobs with artifact upload/download, but no changes to the caller workflow.

The backend configuration is fully managed by the workflow — calling repos do not declare a backend block.

## Usage

```yaml
# .github/workflows/deploy-infrastructure.yaml
name: Deploy Infrastructure

on:
  push:
    branches: [main]

jobs:
  deploy:
    uses: kad-products/platform/.github/workflows/apply-open-tofu.yaml@main
    with:
      app_name: my-app
      environment: production
      working_directory: infrastructure
    secrets: inherit
```

The workflow reads the following organization secrets directly — callers do not need to map them:

| Secret | Provisioned by |
|---|---|
| `TOFU_BACKEND_ACCESS_KEY_ID` | `open-tofu/state-storage` module |
| `TOFU_BACKEND_SECRET_ACCESS_KEY` | `open-tofu/state-storage` module |
| `CLOUDFLARE_ACCOUNT_ID` | Set manually as an org secret |

## Inputs

| Input | Required | Description |
|---|---|---|
| `app_name` | Yes | Application name — used as the first segment of the state key (`<app_name>/<environment>/terraform.tfstate`) |
| `environment` | Yes | Environment name — used as the second segment of the state key, and as the GitHub Actions environment for the job |
| `working_directory` | Yes | Path to the OpenTofu root configuration within the calling repo (e.g. `infrastructure`) |

