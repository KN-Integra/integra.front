import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type AccessResourceMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export default interface AccessResourcesTable {
  id: string
  name: string
  method: AccessResourceMethods
  path: string
  user_id: string

  created_at: Generated<Date>
}

export type AccessControlRow = Selectable<AccessResourcesTable>
export type InsertableAccessResourceRow = Insertable<AccessResourcesTable>
export type UpdateableAccessResourceRow = Updateable<AccessResourcesTable>
