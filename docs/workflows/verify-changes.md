# Verify Changes Workflows

Two reusable workflows intended to be used together as a `verify-changes` workflow in consuming repos. Combining them into a single caller with consistent job names (`lint-code` and `run-tests`) enables org-level branch protection rulesets to require both checks universally without per-repo configuration.

## `lint-code.yaml`

Runs the repo's lint, format, and type checks via the `ci:lint` script. The consuming repo is responsible for defining what `ci:lint` covers — typically a combination of Biome, Knip, Prettier, and TypeScript type checking.

## `run-tests.yaml`

Runs the repo's full test suite via the `ci:tests` script inside the official Playwright container. Using the Playwright container as the universal baseline means repos with only unit tests run in a slightly heavier environment, but all repos use the same setup — avoiding a two-tier system that would produce inconsistent check names.

Initializes Git LFS before checkout and sets `HOME: /root` to ensure Playwright can locate its browser installations inside the container.

The consuming repo defines what `ci:tests` runs — it may be unit tests only, Playwright component tests only, or any combination.

## Usage

```yaml
# .github/workflows/verify-changes.yaml
name: Verify Changes

on:
  pull_request:
    branches: [main]

jobs:
  lint-code:
    uses: kad-products/platform/.github/workflows/lint-code.yaml@main
    permissions:
      contents: read
    secrets: inherit

  run-tests:
    uses: kad-products/platform/.github/workflows/run-tests.yaml@main
    permissions:
      contents: read
    secrets: inherit
```

## Required scripts

Each consuming repo must define these in `package.json`:

| Script | Purpose |
|---|---|
| `ci:lint` | Runs all lint, format, and type checks |
| `ci:tests` | Runs the full test suite |

## Playwright container version

The container is pinned to `mcr.microsoft.com/playwright:v1.63.0-noble`. When upgrading Playwright in a consuming repo, update the container version in the platform repo to match.
