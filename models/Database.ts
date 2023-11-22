import type { AccessTokensTable, PermissionsTable, UsersTable } from '.'

export default interface Database {
  access_tokens: AccessTokensTable
  permissions: PermissionsTable
  users: UsersTable
}
