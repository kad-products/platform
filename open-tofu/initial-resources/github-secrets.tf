resource "github_actions_organization_secret" "kad_cf_r2_access_key_id" {
  secret_name = "KAD_CF_R2_ACCESS_KEY_ID"
  visibility  = "all"
  value       = cloudflare_account_token.kad_cloudflare_token.id
}

resource "github_actions_organization_secret" "kad_cf_r2_secret_key" {
  secret_name = "KAD_CF_R2_SECRET_KEY"
  visibility  = "all"
  value       = sha256(cloudflare_account_token.kad_cloudflare_token.value)
}

resource "github_actions_organization_secret" "kad_cloudflare_token" {
  secret_name = "KAD_CLOUDFLARE_TOKEN"
  visibility  = "all"
  value       = cloudflare_account_token.kad_cloudflare_token.value
}

resource "github_actions_organization_secret" "kad_cloudflare_account_id" {
  secret_name = "KAD_CLOUDFLARE_ACCOUNT_ID"
  visibility  = "all"
  value       = var.cloudflare_account_id
}
