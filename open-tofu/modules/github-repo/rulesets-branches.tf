resource "github_repository_ruleset" "main" {
  name        = "main"
  repository  = github_repository.repo.name
  target      = "branch"
  enforcement = "active"

  bypass_actors {
    actor_type  = "OrganizationAdmin"
    bypass_mode = "always"
  }

  conditions {
    ref_name {
      include = ["refs/heads/main"]
      exclude = []
    }
  }

  rules {
    deletion                = true
    non_fast_forward        = true  # block force pushes
    required_linear_history = false # necessary to allow merge commits
    pull_request {
      allowed_merge_methods             = ["merge"]
      dismiss_stale_reviews_on_push     = true
      require_last_push_approval        = true
      required_approving_review_count   = 0 # probably enable this if/when there are more devs
      required_review_thread_resolution = true
    }
    required_status_checks {
      dynamic "required_check" {
        for_each = var.required_checks
        content {
          context = required_check.value
        }
      }
      strict_required_status_checks_policy = true
    }
  }
}
