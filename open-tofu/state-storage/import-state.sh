#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f "local.auto.tfvars" ]]; then
  echo "Error: local.auto.tfvars not found."
  echo "Create it with cloudflare_account_id, cloudflare_api_token, and github_token before running this script."
  exit 1
fi

ACCOUNT_ID=$(grep -E 'cloudflare_account_id\s*=' local.auto.tfvars | sed 's/.*=\s*"\(.*\)"/\1/')
GITHUB_ORG="kad-products"
BUCKET_NAME="kad-products-opentofu-remote-state"

if [[ -z "$ACCOUNT_ID" ]]; then
  echo "Error: could not parse cloudflare_account_id from local.auto.tfvars"
  exit 1
fi

if [[ -z "${R2_TOKEN_ID:-}" ]]; then
  echo "Error: R2_TOKEN_ID environment variable is not set."
  echo "Find the Access Key ID for the 'opentofu-remote-state' token in the Cloudflare dashboard (R2 → Manage R2 API tokens)."
  exit 1
fi

tofu init
tofu import cloudflare_r2_bucket.opentofu_remote_state "${ACCOUNT_ID}/${BUCKET_NAME}"
tofu import cloudflare_api_token.opentofu_state "${R2_TOKEN_ID}"
tofu import github_actions_organization_secret.r2_access_key_id "${GITHUB_ORG}/TOFU_BACKEND_ACCESS_KEY_ID"
tofu import github_actions_organization_secret.r2_secret_access_key "${GITHUB_ORG}/TOFU_BACKEND_SECRET_ACCESS_KEY"
