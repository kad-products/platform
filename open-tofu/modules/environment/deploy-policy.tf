resource "github_repository_environment_deployment_policy" "staging_semver_tags" {
  repository  = github_repository.repo.name
  environment = github_repository_environment.environment.environment
  tag_pattern = "v*"
}
