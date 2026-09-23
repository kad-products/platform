data "github_users" "org_admins" {
  usernames = ["arsdehnel", "DorothyToth", "karennee-debug"]
}

data "github_user" "org_admins" {
  for_each = toset(data.github_users.org_admins.logins)
  username = each.key
}
