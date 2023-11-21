import type { AccessTokenTable, PermissionTable, UserTable } from '.'

export default interface Database {
  access_token: AccessTokenTable
  permission: PermissionTable
  user: UserTable
}
