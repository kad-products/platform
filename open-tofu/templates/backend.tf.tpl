terraform {
  backend "s3" {
    bucket                      = "kad-products-opentofu-remote-state"
    key                         = "${TOFU_STATE_KEY}"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
    access_key                  = "${TOFU_BACKEND_ACCESS_KEY}"
    secret_key                  = "${TOFU_BACKEND_SECRET_KEY}"
    endpoints = {
      s3 = "https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
    }
  }
}
