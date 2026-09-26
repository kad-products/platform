# OpenTofu

Reusable OpenTofu modules and the workflow for running them across the KAD Products organization. All modules use the GitHub provider (`integrations/github ~> 6.0`) and manage GitHub resources.

## Modules

| Module | Description |
|---|---|
| [github-repo](./github-repo.md) | Creates and configures a GitHub repository with standard settings, branch protection, and tag rulesets |
| [github-environment](./github-environment.md) | Adds a deployment environment to an existing GitHub repository |

## Deploying

Modules are run via the [Apply OpenTofu](../workflows/apply-open-tofu.md) reusable workflow, which handles remote state in the shared Cloudflare R2 bucket and injects backend credentials at runtime. Calling repos do not need to configure the backend themselves.

## State key convention

State is stored at `<app_name>/<environment>/terraform.tfstate` in the shared R2 bucket. When calling the apply workflow, `app_name` should match the repository slug and `environment` should match the GitHub Actions environment (e.g. `production`).
