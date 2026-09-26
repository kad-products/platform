resource "cloudflare_r2_bucket" "opentofu_remote_state" {
  account_id = var.cloudflare_account_id
  name       = "kad-products-opentofu-remote-state"
}
