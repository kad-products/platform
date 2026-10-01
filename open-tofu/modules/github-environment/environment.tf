resource "github_repository_environment" "environment" {
  environment = var.environment_name
  repository  = var.repo_name

  reviewers {
    users = [for k, u in data.github_user.org_admins : u.id if var.environment_name == "production" || k == "arsdehnel"]
  }

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}
