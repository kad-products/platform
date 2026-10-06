resource "github_branch" "main" {
  repository = github_repository.repo.name
  branch     = "main"
}

resource "github_branch_default" "main" {
  repository = github_repository.repo.name
  branch     = "main"
}
