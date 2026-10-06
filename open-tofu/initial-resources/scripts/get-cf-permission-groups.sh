#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)
API_TOKEN=$(echo "$INPUT" | jq -r '.api_token')
ACCOUNT_ID=$(echo "$INPUT" | jq -r '.account_id')

# for research purposes
# curl -s \
#     -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
#     "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/tokens/permission_groups" \
#     | jq '[.result[] | {id, name}]' | jq -r '.[] | .name'

RESULT=$(curl -sf \
  -H "Authorization: Bearer ${API_TOKEN}" \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/tokens/permission_groups")

echo "RESULT: $RESULT" >> debug-cf-perm-groups.log

R2_READ_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Workers R2 Storage Bucket Item Read") | .id')
R2_WRITE_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Workers R2 Storage Bucket Item Write") | .id')
SECRETS_STORE_READ_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Secrets Store Read") | .id')
WORKERS_SCRIPTS_WRITE_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Workers Scripts Write") | .id')

jq -n \
  --arg r2_bucket_item_read  "$R2_READ_ID" \
  --arg r2_bucket_item_write "$R2_WRITE_ID" \
  --arg secrets_store_read  "$SECRETS_STORE_READ_ID" \
  --arg workers_scripts_write "$WORKERS_SCRIPTS_WRITE_ID" \
  '{r2_bucket_item_read: $r2_bucket_item_read, r2_bucket_item_write: $r2_bucket_item_write, secrets_store_read: $secrets_store_read, workers_scripts_write: $workers_scripts_write}'
