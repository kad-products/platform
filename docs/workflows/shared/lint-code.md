# lint-code.yaml

Runs the calling repo's `ci:lint` script via pnpm.

## Inputs

None.

## Secrets

Uses `GITHUB_TOKEN` automatically for authenticating with GitHub Packages.

## Permissions

| Permission | Level |
|---|---|
| `contents` | `read` |
| `packages` | `read` |

## Requirements

- `.nvmrc` for Node version resolution
- `ci:lint` script defined in `package.json`
