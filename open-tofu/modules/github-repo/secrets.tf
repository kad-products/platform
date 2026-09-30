resource "github_actions_organization_secret_repository" "kad_workflow_access" {
  secret_name   = "KAD_WORKFLOW_AUTOMATION"
  repository_id = github_repository.repo.repo_id
}