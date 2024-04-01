import type { AccessTokensTable, PermissionsTable, UsersTable, AccessResourcesTable } from '.'

export default interface Database {
  access_tokens: AccessTokensTable
  permissions: PermissionsTable
  users: UsersTable
  access_control: AccessResourcesTable
}
