# Plan OpenTofu

Runs `tofu init` and `tofu plan` against the calling repo's OpenTofu configuration, using KAD Products' shared Cloudflare R2 bucket as the remote backend for state storage.

When triggered by a pull request, posts the plan output as a comment on the PR. If a comment for the same `state_name` already exists (e.g. from a previous commit on the branch), it is updated in place rather than creating a new one.

The backend configuration is fully managed by the workflow — calling repos do not declare a backend block.

## Usage

```yaml
# .github/workflows/verify-changes.yaml
name: Verify Changes

on:
  pull_request:
    branches: [main]

jobs:
  plan-github-config:
    uses: kad-products/platform/.github/workflows/plan-open-tofu.yaml@main
    with:
      app_name: my-app
      state_type: github-config
      state_name: setup
      working_directory: infrastructure/github
    permissions:
      contents: read
      pull-requests: write
    secrets: inherit
```

The `pull-requests: write` permission is required for the workflow to post and update plan comments on the PR.

State is looked up at `<app_name>/<state_type>/<state_name>/terraform.tfstate` — the same key used by [Apply OpenTofu](./apply-open-tofu.md), so plan and apply always operate against the same state.

The workflow reads the following organization secrets directly — callers do not need to map them:

| Secret | Provisioned by |
|---|---|
| `TOFU_BACKEND_ACCESS_KEY_ID` | `open-tofu/state-storage` module |
| `TOFU_BACKEND_SECRET_ACCESS_KEY` | `open-tofu/state-storage` module |
| `CLOUDFLARE_ACCOUNT_ID` | Set manually as an org secret |

## Inputs

| Input | Required | Description |
|---|---|---|
| `app_name` | Yes | Application name — first segment of the state key |
| `state_type` | Yes | State category — second segment of the state key (e.g. `github-config`, `app-deployment`) |
| `state_name` | Yes | Instance within the category — third segment of the state key (e.g. `setup`, `production`) |
| `working_directory` | Yes | Path to the OpenTofu root configuration within the calling repo |
