# github-repo

Creates and configures a GitHub repository with KAD Products standard settings.

## What it creates

- **Repository** with `delete_branch_on_merge` and `allow_auto_merge` enabled, issues on, discussions and projects off
- **Branch ruleset** on `main` requiring all specified status checks to pass before merge; org admins can bypass
- **Tag ruleset** enforcing semver format (`vMAJOR.MINOR.PATCH`) on all tags

For product repos (`is_product = true`), the repository `homepage_url` is set to `https://kad-products/products/<repo_name>/`.

## Usage

```hcl
module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=main"

  repo_name        = "my-app"
  repo_description = "My application"
  required_checks  = ["Lint Code", "Run Tests"]
}
```

Pin `ref` to a release tag in production to avoid unexpected changes.

## Variables

| Variable | Type | Required | Default | Description |
|---|---|---|---|---|
| `repo_name` | `string` | Yes | — | Repository slug |
| `repo_description` | `string` | Yes | — | Description shown in GitHub's UI |
| `required_checks` | `set(string)` | Yes | — | Status check names that must pass before merging to `main`. At least one required. |
| `is_product` | `bool` | No | `false` | When `true`, sets `homepage_url` to the KAD Products product page |
