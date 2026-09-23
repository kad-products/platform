variable "repo_name" {
  description = "Name/slug of the repo"
  type        = string
}
variable "repo_description" {
  description = "Description of repo for GitHub's UI"
  type        = string
}
variable "is_product" {
  description = "Indication of if the repo should be managed as a public-facing product repo"
  type        = bool
  default     = false
}
variable "required_checks" {
  description = "Set/list of checks required to pass on PRs to main"
  type        = set(string)
  default     = []
}
