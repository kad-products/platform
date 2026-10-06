module "repo" {
  source = "github.com/kad-products/platform//open-tofu/modules/github-repo?ref=v1.16.2"

  repo_name        = var.repo_name
  repo_description = "KAD Platform Automation"
  is_product       = true
  required_checks = [
    "plan-github-setup / Plan",
    "lint-code / lint-code",
    "run-tests / run-tests",
    "create-release-dry-run / create-release-dry-run",
    "lint-commits / lint-commits",
  ]
}
