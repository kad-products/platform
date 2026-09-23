resource "github_repository" "repo" {
  name                   = var.repo_name
  description            = var.repo_description
  delete_branch_on_merge = true
  allow_auto_merge       = true
  has_discussions        = false
  has_issues             = true
  has_projects           = false
  homepage_url           = var.is_product ? "https://kad-products/products/${var.repo_name}/" : ""
}
