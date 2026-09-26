# Test OpenTofu

Runs `tofu init` and `tofu test` against a single OpenTofu module directory.

## Usage

```yaml
# .github/workflows/verify-changes.yaml
jobs:
  test-my-module:
    uses: kad-products/platform/.github/workflows/test-open-tofu.yaml@main
    permissions:
      contents: read
    with:
      working_directory: path/to/module
```

Call it once per module. Each call is an independent job and runs in parallel.

## Inputs

| Input | Required | Description |
|---|---|---|
| `working_directory` | Yes | Path to the OpenTofu module to test |
