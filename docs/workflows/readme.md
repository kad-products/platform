# Workflows

Reusable GitHub Actions workflows for use across the KAD Products organization. Consume them with `uses: kad-products/platform/.github/workflows/<name>@main` and `secrets: inherit`.

## Available workflows

| Workflow | Description |
|---|---|
| [Apply OpenTofu](./apply-open-tofu.md) | Runs OpenTofu plan and apply against a calling repo's infrastructure, using Cloudflare R2 for remote state |
| [Create Release](./semantic-release.md) | Automated versioning and GitHub release creation on push to main, with a dry-run variant for pull requests |
| [Lint Commits](./lint-commits.md) | Validates that PR commits follow the Conventional Commits format |
| [Verify Changes](./verify-changes.md) | Lint and test checks intended to run together on pull requests — produces consistent job names for branch protection rulesets |

## Naming conventions

These conventions apply to all workflow files in this repo and to the caller workflows in consuming repos.

### Filenames

Filenames follow the pattern `<verb>-<noun>-<context>.yaml`. The verb describes the action being performed, the noun is what it acts on, and the context (optional) narrows it further — for example `create-release-dry-run.yaml`.

The key principle is that names should describe **what the workflow does, not the tool it uses to do it**. `commitlint.yaml` names a tool. `lint-commits.yaml` names an action. This forces a little more thought — the obvious name is often wrong or misleading. A workflow that runs semantic-release isn't named `semantic-release.yaml`; it's named `create-release.yaml` because creating a GitHub release is what it actually does.

### Workflow `name`

The `name` field is the title-case equivalent of the filename, with hyphens replaced by spaces. A file named `create-release-dry-run.yaml` gets `name: Create Release Dry Run`.

### Job keys

When a workflow contains a single job, the job key matches the filename without the extension (e.g. `create-release`, `create-release-dry-run`). When there are two or more jobs, each key is kebab-case and describes what makes that job distinct within the context of the overall workflow.

### Step `id` and `name`

Step IDs are optional and should only be added when a later step needs to reference the outputs of that step. When an `id` is used, a `name` should also be provided so the step has a readable title in the GitHub Actions UI. Steps that don't expose outputs should have neither — let the action name or the first line of the `run` block serve as the label.
