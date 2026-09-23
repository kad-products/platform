mock_provider "github" {}

variables {
  repo_name        = "my-repo"
  repo_description = "My test repo"
  required_checks  = ["ci/build"]
}

run "product_repo_homepage_url" {
  command = plan

  variables {
    is_product = true
  }

  assert {
    condition     = github_repository.repo.homepage_url == "https://kad-products/products/my-repo/"
    error_message = "Expected homepage_url to be set for product repos"
  }
}

run "non_product_repo_homepage_url" {
  command = plan

  assert {
    condition     = github_repository.repo.homepage_url == ""
    error_message = "Expected homepage_url to be empty for non-product repos"
  }
}

run "repo_settings" {
  command = plan

  assert {
    condition     = github_repository.repo.delete_branch_on_merge == true
    error_message = "Expected delete_branch_on_merge to be true"
  }

  assert {
    condition     = github_repository.repo.allow_auto_merge == true
    error_message = "Expected allow_auto_merge to be true"
  }

  assert {
    condition     = github_repository.repo.has_discussions == false
    error_message = "Expected has_discussions to be false"
  }

  assert {
    condition     = github_repository.repo.has_projects == false
    error_message = "Expected has_projects to be false"
  }

  assert {
    condition     = github_repository.repo.has_issues == true
    error_message = "Expected has_issues to be true"
  }
}

run "branch_ruleset" {
  command = plan

  assert {
    condition     = github_repository_ruleset.main.target == "branch"
    error_message = "Expected branch ruleset target to be 'branch'"
  }

  assert {
    condition     = github_repository_ruleset.main.enforcement == "active"
    error_message = "Expected branch ruleset enforcement to be 'active'"
  }
}

run "rejects_empty_required_checks" {
  command = plan

  variables {
    required_checks = []
  }

  expect_failures = [var.required_checks]
}

run "tag_ruleset" {
  command = plan

  assert {
    condition     = github_repository_ruleset.semver_tags.target == "tag"
    error_message = "Expected tag ruleset target to be 'tag'"
  }

  assert {
    condition     = github_repository_ruleset.semver_tags.enforcement == "active"
    error_message = "Expected tag ruleset enforcement to be 'active'"
  }
}
