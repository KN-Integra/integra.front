import type { AccessTokensTable, PermissionsTable, UsersTable } from '.'

export default interface Database {
  access_token: AccessTokensTable
  permission: PermissionsTable
  user: UsersTable
}
