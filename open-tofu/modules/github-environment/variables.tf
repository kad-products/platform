variable "repo_name" {
  description = "Name/slug of the repo"
  type        = string
}

variable "environment_name" {
  description = "Name of the environment"
  type        = string

  validation {
    condition     = can(regex("^[a-z-]+$", var.environment_name))
    error_message = "environment_name must only contain lowercase letters or hyphens."
  }
}
