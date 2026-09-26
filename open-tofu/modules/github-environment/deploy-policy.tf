resource "github_repository_environment_deployment_policy" "staging_semver_tags" {
  repository  = var.repo_name
  environment = github_repository_environment.environment.environment
  tag_pattern = "v*"
}
