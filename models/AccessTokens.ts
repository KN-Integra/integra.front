import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface AccessTokenTable {
  id: Generated<string>

  user_id: string
  expires_at: Date

  created_at: Generated<Date>
}

export type AccessTokenRow = Selectable<AccessTokenTable>
export type InsertableAccessTokenRow = Insertable<AccessTokenTable>
export type UpdateableAccessTokenRow = Updateable<AccessTokenTable>
