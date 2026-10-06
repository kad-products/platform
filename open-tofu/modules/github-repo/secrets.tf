resource "github_actions_organization_secret_repository" "kad_cloudflare_account_id" {
  secret_name   = "KAD_CLOUDFLARE_ACCOUNT_ID"
  repository_id = github_repository.repo.repo_id
}
resource "github_actions_organization_secret_repository" "kad_cloudflare_token" {
  secret_name   = "KAD_CLOUDFLARE_TOKEN"
  repository_id = github_repository.repo.repo_id
}
resource "github_actions_organization_secret_repository" "kad_cf_r2_access_key_id" {
  secret_name   = "KAD_CF_R2_ACCESS_KEY_ID"
  repository_id = github_repository.repo.repo_id
}
resource "github_actions_organization_secret_repository" "kad_cf_r2_secret_key" {
  secret_name   = "KAD_CF_R2_SECRET_KEY"
  repository_id = github_repository.repo.repo_id
}
