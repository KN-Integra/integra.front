<script setup lang="ts">
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbButton,
  FwbModal,
  FwbInput,
  FwbSelect,
  FwbToast
} from 'flowbite-vue'

import { GenderEnum, type GenderType } from '~/models/Users'
import { useUserStore } from '~/store/user.store'

import type { AdminUserPayload } from '~/server/routes/v1/users/index.get'

const userStore = useUserStore()

enum RoleToPolishEnum {
  'admin' = 'Administrator',
  'user' = 'Członek',
  'unverified' = 'Niezweryfikowany',
  'blocked' = 'Zablokowany'
}

enum GenderToPolishEnum {
  'male' = 'mężczyzna',
  'female' = 'kobieta',
  'other' = 'inna'
}

type RoleToPolishKey = keyof typeof RoleToPolishEnum

const isPasswordHashed = ref(false)

const { data: permissionData } = useLazyFetch('/v1/permissions', {
  headers: {
    Authorization: `${userStore.tokenType} ${userStore.accessToken}`
  }
})

const DATE_FORMATTING_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

const { data } = useLazyAsyncData('users', () =>
  $fetch('/v1/users', {
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    }
  })
)

const users = computed(() => {
  if (!data.value || !('results' in data.value)) return []

  return data.value.results.sort((a, b) =>
    a.last_name > b.last_name ? 1 : a.last_name < b.last_name ? -1 : 0
  ) as AdminUserPayload[]
})

const isShowModal = ref(false)

const userData = ref<
  Partial<
    AdminUserPayload & { student_id: string; permission_id?: string; password?: string; confirm_password?: string }
  >
>({} as Partial<AdminUserPayload & { student_id: string; permission_id?: string }>)

const mode = ref<'create' | 'edit'>('create')

const permissions = computed(() => {
  if (!permissionData.value) return []

  return permissionData.value.results.map((p) => ({
    value: p.id,
    name: RoleToPolishEnum[p.name as RoleToPolishKey],
    trueName: p.name
  }))
})

/**
 *
 * @param m
 * @param user
 */
function openModal(m: 'create' | 'edit', user?: Partial<AdminUserPayload & { student_id: string }>) {
  isShowModal.value = true
  mode.value = m

  if (user) {
    userData.value = user

    userData.value.permission_id = permissions.value.find((p) => p.trueName === user.permission)?.value
  }
}

const showSuccessToast = ref(false)
const showErrorToast = ref(false)

/**
 *
 */
function closeModal() {
  isShowModal.value = false
  userData.value = {} as Partial<AdminUserPayload & { student_id: string }>
}

/**
 *
 */
function validate() {
  if (!userData.value.first_name) {
    return 'Podaj imię'
  }

  if (!userData.value.last_name) {
    return 'Podaj nazwisko'
  }

  if (!userData.value.email) {
    return 'Podaj email'
  }

  if (!userData.value.student_id) {
    return 'Podaj numer albumu'
  }

  if (!userData.value.gender) {
    return 'Podaj płeć'
  }

  if (!userData.value.permission_id) {
    return 'Podaj rolę'
  }

  if (mode.value === 'create') {
    if (!userData.value.password) {
      return 'Podaj hasło'
    }

    if (!isPasswordHashed.value) {
      if (!userData.value.confirm_password) {
        return 'Powtórz hasło'
      }

      if (userData.value.password !== userData.value.confirm_password) {
        return 'Hasła nie są takie same'
      }
    }
  }
}

/**
 *
 */
async function saveUser() {
  const invalid = validate()

  if (invalid) return alert(invalid)

  const { data: d, error: err } = await useFetch('/v1/hash', {
    method: 'POST',
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    },
    body: {
      data: userData.value.password
    }
  })

  if (err.value) {
    return alert('Wystąpił błąd podczas hashowania hasła')
  }

  if (!d.value) {
    return alert('Wystąpił błąd podczas hashowania hasła')
  }

  const hash = d.value as string

  if (userData.value.password) {
    if (isPasswordHashed.value) {
      userData.value.confirm_password = userData.value.password
    } else {
      userData.value.password = hash
      userData.value.confirm_password = hash
    }
  }

  try {
    if (mode.value === 'create') {
      await $fetch('/v1/users', {
        method: 'POST',
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        },
        body: userData.value
      })
    } else {
      await $fetch(`/v1/users/${userData.value.id}`, {
        method: 'POST',
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        },
        body: userData.value
      })
    }

    await refreshNuxtData('users')

    showSuccessToast.value = true

    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)
  } catch (e) {
    showErrorToast.value = true

    setTimeout(() => {
      showErrorToast.value = false
    }, 3000)
  }

  closeModal()
}

onBeforeMount(async () => {
  await refreshNuxtData('users')
})
</script>

<template>
  <section class="mt-8">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-3xl font-bold">Użytkownicy</h3>

      <fwb-button color="green" class="flowbite gap-2" @click="openModal('create')">
        <span class="inline-flex justify-center items-center flex-nowrap gap-2">
          <lazy-client-only>
            <fa-icon icon="fas fa-plus" class="h-4 w-4" />
          </lazy-client-only>

          <span>Dodaj użytkownika</span>
        </span>
      </fwb-button>
    </div>

    <fwb-table v-if="data && 'results' in data && data.results && data.results.length" class="flowbite" hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <fwb-a href="#">Nr albumu</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Nazwisko</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Imię</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Płeć</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Email</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Rola</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Ostatnie logowanie</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Akcje</fwb-a>
        </fwb-table-head-cell>
      </fwb-table-head>

      <fwb-table-body>
        <fwb-table-row v-for="user in users" :key="user.id">
          <fwb-table-cell>{{ user.student_id }}</fwb-table-cell>
          <fwb-table-cell>{{ user.last_name }}</fwb-table-cell>
          <fwb-table-cell>{{ user.first_name }}</fwb-table-cell>
          <fwb-table-cell class="capitalize">{{ GenderToPolishEnum[user.gender as GenderType] }}</fwb-table-cell>
          <fwb-table-cell>{{ user.email }}</fwb-table-cell>
          <fwb-table-cell>{{ RoleToPolishEnum[user.permission as RoleToPolishKey] }}</fwb-table-cell>
          <fwb-table-cell class="capitalize">{{
            new Date(user.last_login_at).getTime()
              ? new Date(user.last_login_at).toLocaleString('pl-PL', DATE_FORMATTING_OPTIONS as any)
              : 'Nigdy'
          }}</fwb-table-cell>

          <fwb-table-cell>
            <div class="flex justify-center items-center gap-2">
              <fwb-button
                class="flowbite !p-2"
                @click="openModal('edit', { ...user, student_id: user.student_id.toString() } as any)"
              >
                <span class="sr-only">Edytuj</span>

                <lazy-client-only>
                  <fa-icon icon="far fa-edit" class="h-4 w-4" />
                </lazy-client-only>
              </fwb-button>

              <fwb-button class="flowbite !p-2">
                <span class="sr-only">Usuń</span>

                <lazy-client-only>
                  <fa-icon icon="far fa-trash-alt" class="h-4 w-4" />
                </lazy-client-only>
              </fwb-button>

              <fwb-button v-if="!['admin', 'blocked'].includes(user.permission)" class="flowbite !p-2">
                <span class="sr-only">Zbanuj</span>

                <lazy-client-only>
                  <fa-icon icon="fas fa-ban" class="h-4 w-4" />
                </lazy-client-only>
              </fwb-button>
            </div>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>

    <fwb-modal v-if="isShowModal" class="flowbite" @close="closeModal()">
      <template #header>
        <div class="flex items-center text-lg">{{ mode === 'create' ? 'Utwórz nowego' : 'Edytuj' }} użytkownika</div>
      </template>

      <template #body>
        <fwb-input v-model="userData.first_name" placeholder="Podaj imię" label="Imię" class="mb-2" required />
        <fwb-input v-model="userData.last_name" placeholder="Podaj nazwisko" label="Nazwisko" class="mb-2" required />
        <fwb-input
          v-model="userData.email"
          placeholder="Podaj email"
          label="Email"
          class="mb-2"
          type="email"
          required
        />
        <fwb-input
          v-model="userData.student_id"
          type="number"
          min="100000"
          max="999999"
          placeholder="Podaj numer albumu"
          label="Numer albumu"
          class="mb-2"
          required
        />

        <div class="mb-4">
          <fwb-select
            v-model="userData.gender"
            :options="[
              { value: GenderEnum.male, name: GenderToPolishEnum.male },
              { value: GenderEnum.female, name: GenderToPolishEnum.female },
              { value: GenderEnum.other, name: GenderToPolishEnum.other }
            ]"
            label="Płeć"
            class="[&>*]:capitalize"
            placeholder="Wybierz płeć..."
            required
          />
        </div>

        <div class="mb-4">
          <fwb-select
            v-model="userData.permission_id"
            :options="permissions"
            label="Rola"
            placeholder="Wybierz rolę..."
          />
        </div>

        <div class="flex flex-col mt-8">
          <fwb-input
            v-model="isPasswordHashed"
            label="Zahashowane hasło?"
            class="mb-2 inline-flex gap-x-2"
            type="checkbox"
          />

          <div v-if="!isPasswordHashed" class="w-full inline-flex gap-x-4">
            <fwb-input
              v-model="userData.password"
              placeholder="Podaj hasło"
              label="Hasło"
              type="password"
              :required="mode === 'create'"
              class="w-1/2"
            />

            <fwb-input
              v-if="!isPasswordHashed"
              v-model="userData.confirm_password"
              placeholder="Powtórz hasło"
              label="Powtórz hasło"
              type="password"
              :required="mode === 'create'"
              class="w-1/2"
            />
          </div>

          <fwb-input
            v-else
            v-model="userData.password"
            placeholder="Podaj zahashowane hasło"
            label="Hasło"
            type="password"
            :required="mode === 'create'"
          />
        </div>
      </template>

      <template #footer>
        <div class="w-full inline-flex justify-center gap-4">
          <fwb-button color="alternative" @click="closeModal()"> Anuluj </fwb-button>
          <fwb-button color="green" @click="saveUser()"> Zapisz </fwb-button>
        </div>
      </template>
    </fwb-modal>

    <fwb-toast
      v-if="showSuccessToast"
      divide
      type="success"
      class="flowbite toast fixed top-20 right-1/2 translate-x-1/2 sm:right-8 sm:translate-x-0"
    >
      Użytkownik został {{ mode === 'create' ? 'utworzony' : 'zaktualizowany' }} pomyślnie.
    </fwb-toast>

    <fwb-toast
      v-if="showErrorToast"
      divide
      type="warning"
      class="flowbite toast fixed top-20 right-1/2 translate-x-1/2 sm:right-8 sm:translate-x-0"
    >
      Wystąpił błąd podczas {{ mode === 'create' ? 'tworzenia' : 'aktualizacji' }} użytkownika.
    </fwb-toast>
  </section>
</template>
