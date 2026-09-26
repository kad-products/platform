resource "github_repository_ruleset" "semver_tags" {
  name        = "semver-tags"
  repository  = github_repository.repo.name
  target      = "tag"
  enforcement = "active"

  conditions {
    ref_name {
      include = ["~ALL"]
      exclude = []
    }
  }

  rules {
    tag_name_pattern {
      operator = "regex"
      pattern  = "^v[0-9]+\\.[0-9]+\\.[0-9]+(-[0-9A-Za-z.-]+)?(\\+[0-9A-Za-z.-]+)?$"
      name     = "semver with v prefix"
    }
  }
}
