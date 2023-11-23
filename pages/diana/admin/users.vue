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
  FwbSelect
} from 'flowbite-vue'

import { useUserStore } from '~/store/user.store'

import type { AdminUserPayload } from '~/server/routes/v1/users/index.get'

const userStore = useUserStore()

enum RoleToPolishEnum {
  'admin' = 'Administrator',
  'user' = 'Członek',
  'unverified' = 'Niezweryfikowany',
  'blocked' = 'Zablokowany'
}

type RoleToPolish = keyof typeof RoleToPolishEnum

const { data: permissionData } = useLazyFetch('/v1/permissions', {
  headers: {
    Authorization: `${userStore.tokenType} ${userStore.accessToken}`
  }
})

const { data, error } = useLazyAsyncData('users', () =>
  $fetch('/v1/users', {
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    }
  })
)

const isShowModal = ref(false)

const userData = ref<Partial<AdminUserPayload & { student_id: string; permission_id?: string }>>(
  {} as Partial<AdminUserPayload & { student_id: string; permission_id?: string }>
)

const mode = ref<'create' | 'edit'>('create')

const permissions = computed(() => {
  if (!permissionData.value) return []

  return permissionData.value.results.map((p) => ({
    value: p.id,
    name: RoleToPolishEnum[p.name as RoleToPolish],
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
async function saveUser() {
  if (mode.value === 'create') {
    console.debug('userData', userData.value)

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

  closeModal()
}

watch(error, (err) => {
  alert(err)
})
</script>

<template>
  <section class="mt-8">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Użytkownicy</h1>

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
        <fwb-table-row v-for="user in data.results as AdminUserPayload[]" :key="user.id">
          <fwb-table-cell>{{ user.student_id }}</fwb-table-cell>
          <fwb-table-cell>{{ user.last_name }}</fwb-table-cell>
          <fwb-table-cell>{{ user.first_name }}</fwb-table-cell>
          <fwb-table-cell>{{ user.email }}</fwb-table-cell>
          <fwb-table-cell>{{ RoleToPolishEnum[user.permission as RoleToPolish] }}</fwb-table-cell>
          <fwb-table-cell>{{ new Date(user.last_login_at).toUTCString() }}</fwb-table-cell>

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
        <fwb-input v-model="userData.first_name" placeholder="Podaj imię" label="Imię" class="mb-2" />
        <fwb-input v-model="userData.last_name" placeholder="Podaj nazwisko" label="Nazwisko" class="mb-2" />
        <fwb-input v-model="userData.email" placeholder="Podaj email" label="Email" class="mb-2" />
        <fwb-input
          v-model="userData.student_id"
          type="number"
          min="100000"
          max="999999"
          placeholder="Podaj numer albumu"
          label="Numer albumu"
          class="mb-2"
        />

        <fwb-select
          v-model="userData.permission_id"
          :options="permissions"
          label="Rola"
          class="mb-2"
          placeholder="Wybierz rolę..."
        />
      </template>

      <template #footer>
        <div class="w-full inline-flex justify-center gap-4">
          <fwb-button color="alternative" @click="closeModal()"> Anuluj </fwb-button>
          <fwb-button color="green" @click="saveUser()"> Zapisz </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </section>
</template>
