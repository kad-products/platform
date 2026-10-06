module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.16.2"

  repo_name        = var.repo_name
  repo_description = "KAD Platform Automation"
  is_product       = true
  required_checks = [
    "test-cli / run-tests",
    "lint-cli / lint-code",
    "test-github-environment / test-open-tofu",
    "lint-code / lint-code",
    "plan-github-setup / plan-open-tofu",
    "test-github-repo / test-open-tofu",
    "create-release-dry-run / create-release-dry-run",
  ]
}
