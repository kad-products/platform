#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)
API_TOKEN=$(echo "$INPUT" | jq -r '.api_token')
ACCOUNT_ID=$(echo "$INPUT" | jq -r '.account_id')

RESULT=$(curl -sf \
  -H "Authorization: Bearer ${API_TOKEN}" \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/tokens/permission_groups")

R2_READ_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Workers R2 Storage Bucket Item Read") | .id')
R2_WRITE_ID=$(echo "$RESULT" | jq -r '.result[] | select(.name == "Workers R2 Storage Bucket Item Write") | .id')

jq -n \
  --arg r2_bucket_item_read  "$R2_READ_ID" \
  --arg r2_bucket_item_write "$R2_WRITE_ID" \
  '{r2_bucket_item_read: $r2_bucket_item_read, r2_bucket_item_write: $r2_bucket_item_write}'
