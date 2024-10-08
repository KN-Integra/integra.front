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

import { useUserStore } from '~/store/user.store'

import type { InsertableAccessResourceRow, AccessControlRow } from '~/models/AccessResources'

const userStore = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DATE_FORMATTING_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

const { data: accessControlData } = useLazyAsyncData('access-control', () =>
  $fetch('/v1/access-control', {
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    }
  })
)

const { data: usersData } = useLazyAsyncData('users', () =>
  $fetch('/v1/users', {
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    }
  })
)

// TODO: Finish RBAC
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const accessControl = computed(() => {
  if (!accessControlData.value || !('results' in accessControlData.value)) return []

  return accessControlData.value.results as Partial<
    AccessControlRow & {
      user_first_name: string
      user_last_name: string
    }
  >[]
})

const resourceItems = computed(() => [] as any)

const users = computed(() => {
  if (!usersData.value || !('results' in usersData.value)) return []

  return usersData.value.results
    .sort((a, b) => (a.last_name > b.last_name ? 1 : a.last_name < b.last_name ? -1 : 0))
    .map((user) => ({
      name: `${user.last_name}, ${user.first_name}`,
      value: user.id
    }))
})

const isShowModal = ref(false)

const mode = ref<'create' | 'edit'>('create')

const resourceData = ref<InsertableAccessResourceRow>({} as InsertableAccessResourceRow)

const showSuccessToast = ref(false)
const showErrorToast = ref(false)

/**
 *
 * @param m
 * @param resource
 */
function openModal(m: 'create' | 'edit', resource?: InsertableAccessResourceRow) {
  isShowModal.value = true
  mode.value = m

  if (m === 'create') {
    resourceData.value = {} as InsertableAccessResourceRow
  } else {
    resourceData.value = resource as InsertableAccessResourceRow
  }
}

/**
 *
 */
function closeModal() {
  isShowModal.value = false
  resourceData.value = {} as InsertableAccessResourceRow
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
 *
 */
function validate() {
  if (!resourceData.value.name) {
    return 'Podaj nazwę zaasobu'
  }

  if (!resourceData.value.path) {
    return 'Podaj ścieżkę zasobu'
  }

  if (!resourceData.value.method) {
    return 'Podaj metodę zasobu'
  }

  if (!METHODS.includes(resourceData.value.method)) {
    return 'Podana metoda jest nieprawidłowa'
  }

  if (!resourceData.value.user_id) {
    return 'Wybierz użytkownika'
  }
}

/**
 *
 */
async function saveUser() {
  const invalid = validate()

  if (invalid) return alert(invalid)

  try {
    if (mode.value === 'create') {
      await $fetch('/v1/users', {
        method: 'POST',
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        },
        body: resourceData.value
      })
    } else {
      await $fetch(`/v1/users/${resourceData.value.id}`, {
        method: 'POST',
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        },
        body: resourceData.value
      })
    }

    await refreshNuxtData('users')
    await refreshNuxtData('access-control')

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
  await refreshNuxtData('access-control')
})

/**
 *
 * @param id
 */
function shortenId(id: string) {
  return `${id.slice(0, 4)}...${id.slice(-4)}`
}
</script>

<template>
  <section class="mt-8">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-3xl font-bold">Zasoby</h3>

      <fwb-button color="green" class="flowbite gap-2" @click="openModal('create')">
        <span class="inline-flex justify-center items-center flex-nowrap gap-2">
          <lazy-client-only>
            <fa-icon icon="fas fa-plus" class="h-4 w-4" />
          </lazy-client-only>

          <span>Dodaj zasób</span>
        </span>
      </fwb-button>
    </div>

    <fwb-table class="flowbite" hoverable>
      <fwb-table-head>
        <fwb-table-head-cell>
          <fwb-a href="#">ID</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Nazwa</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Strona w sklepie</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">ID w sklepie</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Ilość</fwb-a>
        </fwb-table-head-cell>

        <fwb-table-head-cell>
          <fwb-a href="#">Akcje</fwb-a>
        </fwb-table-head-cell>
      </fwb-table-head>

      <fwb-table-body>
        <fwb-table-row v-for="item in resourceItems" :key="item.id">
          <fwb-table-cell>{{ shortenId(item.id) }}</fwb-table-cell>
          <fwb-table-cell>{{ item.name }}</fwb-table-cell>
          <fwb-table-cell>{{ item.shop_url }}</fwb-table-cell>
          <fwb-table-cell>{{ item.shop_item_id }}</fwb-table-cell>
          <fwb-table-cell>{{ item.amount }}</fwb-table-cell>

          <fwb-table-cell>
            <div class="flex justify-center items-center gap-2">
              <fwb-button
                class="flowbite !p-2"
                @click="openModal('edit', item as unknown as InsertableAccessResourceRow)"
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
        <fwb-input
          v-model="resourceData.name"
          placeholder="Podaj nazwę uprawnienia"
          label="Nazwa"
          class="mb-2"
          required
        />
        <fwb-input
          v-model="resourceData.path"
          placeholder="Podaj ścieżkę uprawnienia"
          label="Ścieżka uprawnienia"
          class="mb-2"
          required
        />

        <div class="mb-4">
          <fwb-select
            v-model="resourceData.method"
            :options="[
              { name: 'GET', value: 'GET' },
              { name: 'POST', value: 'POST' },
              { name: 'PUT', value: 'PUT' },
              { name: 'PATCH', value: 'PATCH' },
              { name: 'DELETE', value: 'DELETE' }
            ]"
            label="Metoda"
            placeholder="Wybierz metodę..."
            required
          />
        </div>

        <div class="mb-4">
          <fwb-select
            v-model="resourceData.user_id"
            :options="users"
            label="Użytkownik"
            placeholder="Wybierz użytkownika..."
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
