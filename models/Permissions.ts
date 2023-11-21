import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface PermissionTable {
  id: Generated<string>

  name: string

  created_at: Generated<Date>
}

export type PermissionRow = Selectable<PermissionTable>
export type InsertablePermissionRow = Insertable<PermissionTable>
export type UpdateablePermissionRow = Updateable<PermissionTable>
