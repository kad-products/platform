# Workflows

Reusable GitHub Actions workflows for use across the KAD Products organization. Consume them with `uses: kad-products/platform/.github/workflows/<name>@main` and `secrets: inherit`.

## Available workflows

| Workflow | Description |
|---|---|
| [Semantic Release](./semantic-release.md) | Automated versioning and changelog generation on push to main, with a dry-run variant for pull requests |

## Naming conventions

These conventions apply to all workflow files in this repo and to the caller workflows in consuming repos.

### Filenames

Filenames follow the pattern `<verb>-<noun>-<context>.yaml`. The verb describes the action the workflow performs, the noun is what it acts on, and the context (optional) narrows it further — for example `release-dry-run.yaml` where `release` is the verb and `dry-run` is the context.

### Workflow `name`

The `name` field is the title-case equivalent of the filename, with hyphens replaced by spaces. A file named `release-dry-run.yaml` gets `name: Release Dry Run`.

### Job keys

When a workflow contains a single job, the job key matches the filename without the extension (e.g. `release`, `release-dry-run`). When there are two or more jobs, each key is kebab-case and describes what makes that job distinct within the context of the overall workflow.

### Step `id` and `name`

Step IDs are optional and should only be added when a later step needs to reference the outputs of that step. When an `id` is used, a `name` should also be provided so the step has a readable title in the GitHub Actions UI. Steps that don't expose outputs should have neither — let the action name or the first line of the `run` block serve as the label.
