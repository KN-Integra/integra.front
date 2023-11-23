import type { Generated, Insertable, Selectable, Updateable } from 'kysely'

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export type GenderType = typeof GenderEnum

export default interface UsersTable {
  id: Generated<string>

  first_name: string
  last_name: string
  gender: GenderType
  student_id: number

  email: string
  password: string

  permission_id: string

  created_at: Generated<Date>
}

export type UserRow = Selectable<UsersTable>
export type InsertableUserRow = Insertable<UsersTable>
export type UpdateableUserRow = Updateable<UsersTable>