variable "cloudflare_api_token" {
  description = "API token with enough permissions for the resources being defined"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "The account ID into which these resources should be provisioned"
  type        = string
}

variable "github_token" {
  description = "GitHub token with org admin permissions to manage secrets"
  type        = string
  sensitive   = true
}
