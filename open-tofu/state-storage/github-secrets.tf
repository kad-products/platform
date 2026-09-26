data "external" "r2_permission_groups" {
  program = ["${path.module}/scripts/get-r2-permission-groups.sh"]

  query = {
    api_token  = var.cloudflare_api_token
    account_id = var.cloudflare_account_id
  }
}

resource "cloudflare_api_token" "opentofu_state" {
  name = "opentofu-remote-state"

  policies = [{
    effect = "allow"
    permission_groups = [
      { id = data.external.r2_permission_groups.result.r2_bucket_item_read },
      { id = data.external.r2_permission_groups.result.r2_bucket_item_write },
    ]
    resources = jsonencode({
      "com.cloudflare.api.account.${var.cloudflare_account_id}" = "*"
    })
  }]
}

resource "github_actions_organization_secret" "r2_access_key_id" {
  secret_name     = "TOFU_BACKEND_ACCESS_KEY_ID"
  visibility      = "all"
  value = cloudflare_api_token.opentofu_state.id
}

resource "github_actions_organization_secret" "r2_secret_access_key" {
  secret_name     = "TOFU_BACKEND_SECRET_ACCESS_KEY"
  visibility      = "all"
  value = sha256(cloudflare_api_token.opentofu_state.value)
}
