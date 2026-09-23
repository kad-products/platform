resource "github_repository_environment" "environment" {
  environment = var.environment_name
  repository  = github_repository.repo.name

  reviewers {
    users = [for u in data.github_user.org_admins : u.id]
  }

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}
