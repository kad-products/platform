resource "cloudflare_account_token" "kad_cloudflare_token" {
  account_id = var.cloudflare_account_id
  name       = "kad-cloudflare-token"

  policies = [{
    effect = "allow"
    permission_groups = [
      { id = data.external.cf_permission_groups.result.r2_bucket_item_read },
      { id = data.external.cf_permission_groups.result.r2_bucket_item_write },
      { id = data.external.cf_permission_groups.result.secrets_store_read },
      { id = data.external.cf_permission_groups.result.workers_scripts_write },
    ]
    resources = jsonencode({
      "com.cloudflare.api.account.${var.cloudflare_account_id}" = "*"
    })
  }]

  expires_on = "${formatdate("YYYY-MM", timeadd(plantimestamp(), "2160h"))}-01T00:00:00Z"
}

data "external" "cf_permission_groups" {
  program = ["${path.module}/scripts/get-cf-permission-groups.sh"]

  query = {
    api_token  = var.cloudflare_api_token
    account_id = var.cloudflare_account_id
  }
}
