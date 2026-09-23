mock_provider "github" {
  mock_data "github_users" {
    defaults = {
      usernames = ["arsdehnel", "DorothyToth", "karennee-debug"]
    }
  }

  mock_data "github_user" {
    defaults = {
      id = 12345
    }
  }
}

variables {
  repo_name        = "my-repo"
  environment_name = "staging"
}

run "valid_environment_name" {
  command = plan

  assert {
    condition     = github_repository_environment.environment.environment == "staging"
    error_message = "Expected environment name to be 'staging'"
  }

  assert {
    condition     = github_repository_environment.environment.repository == "my-repo"
    error_message = "Expected repository to be 'my-repo'"
  }

  assert {
    condition     = github_repository_environment_deployment_policy.staging_semver_tags.tag_pattern == "v*"
    error_message = "Expected tag pattern to be 'v*'"
  }
}

run "rejects_uppercase" {
  command = plan

  variables {
    environment_name = "Staging"
  }

  expect_failures = [var.environment_name]
}

run "rejects_numbers" {
  command = plan

  variables {
    environment_name = "staging-1"
  }

  expect_failures = [var.environment_name]
}
