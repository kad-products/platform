terraform {
  required_version = ">= 1.7"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
    external = {
      source  = "hashicorp/external"
      version = "~> 2.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "github" {
  owner = "kad-products"
  token = var.github_token
}
