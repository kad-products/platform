# GitHub Packages

GitHub Packages requires authentication to install packages, even public ones. This guide covers how to configure pnpm to install `@kad-products` scoped packages.

## 1. Create a personal access token

In GitHub, go to **Settings → Developer settings → Personal access tokens → Tokens (classic)** and generate a token with the `read:packages` scope. No other scopes are needed.

## 2. Add the token to your global `.npmrc`

Add the following to `~/.npmrc`, replacing `YOUR_TOKEN` with the token you just created:

```
@kad-products:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

This scopes the GitHub Packages registry to `@kad-products` packages only — all other packages continue to resolve from the default npm registry.

## 3. Install as normal

```sh
pnpm add @kad-products/design-system
```

## CI setup for consuming repos

When a repo that depends on `@kad-products` packages runs `pnpm install` in CI, it also needs registry auth. The `GITHUB_TOKEN` available in every workflow run already has implicit `read:packages` access for packages within the `kad-products` org — it just needs to be wired up.

### 1. Add a project-level `.npmrc`

Commit this to the root of the consuming repo. The token value is intentionally left as an environment variable reference — it will be populated at runtime by the workflow:

```
@kad-products:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 2. Add `registry-url` to the shared workflow's `setup-node` step

The shared `create-release.yaml` workflow will need `registry-url` added to the `actions/setup-node` step. This causes the action to automatically set `NODE_AUTH_TOKEN` from `GITHUB_TOKEN`:

```yaml
- uses: actions/setup-node@v7
  with:
    node-version-file: '.nvmrc'
    cache: 'pnpm'
    registry-url: 'https://npm.pkg.github.com'
```

No changes to `KAD_WORKFLOW_AUTOMATION` or any other PAT are needed — `GITHUB_TOKEN` covers it.
