resource "github_repository" "repo" {
  name         = var.repo_name
  description  = var.repo_description
  homepage_url = var.is_product ? "https://kad-products.com/products/${var.repo_name}/" : ""
  is_template  = var.is_template

  # features
  has_discussions = false
  has_issues      = true
  has_projects    = false

  # PR controls
  allow_merge_commit     = true
  allow_squash_merge     = false
  allow_rebase_merge     = false
  allow_update_branch    = true
  delete_branch_on_merge = true
  allow_auto_merge       = true
}

