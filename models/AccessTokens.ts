import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export default interface AccessTokensTable {
  id: Generated<string>

  user_id: string

  token: string
  expires_at: Date

  created_at: Generated<Date>
}

export type AccessTokenRow = Selectable<AccessTokensTable>
export type InsertableAccessTokenRow = Insertable<AccessTokensTable>
export type UpdateableAccessTokenRow = Updateable<AccessTokensTable>
