import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface PermissionsTable {
  id: Generated<string>

  name: string

  created_at: Generated<Date>
}

export type PermissionRow = Selectable<PermissionsTable>
export type InsertablePermissionRow = Insertable<PermissionsTable>
export type UpdateablePermissionRow = Updateable<PermissionsTable>
