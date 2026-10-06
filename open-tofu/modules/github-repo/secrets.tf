resource "github_actions_organization_secret_repository" "kad_cloudflare_token" {
  secret_name   = "KAD_CLOUDFLARE_TOKEN"
  repository_id = github_repository.repo.repo_id
}
