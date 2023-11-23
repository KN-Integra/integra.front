<script setup lang="ts">
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbTooltip,
  FwbButton
} from 'flowbite-vue'

import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()

enum RoleToPolishEnum {
  'admin' = 'Administrator',
  'member' = 'Członek',
  'unverified' = 'Niezweryfikowany',
  'blocked' = 'Zablokowany'
}

const { data, error } = useLazyAsyncData('users', () =>
  $fetch('/v1/users', {
    headers: {
      Authorization: `${userStore.tokenType} ${userStore.accessToken}`
    }
  })
)

watch(error, (err) => {
  alert(err)
})
</script>

<template>
  <section class="mt-8">
    <fwb-table v-if="data && data.results && data.results.length" class="flowbite" hoverable>
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
        <fwb-table-row v-for="user in data.results" :key="user.id">
          <fwb-table-cell>{{ user.student_id }}</fwb-table-cell>
          <fwb-table-cell>{{ user.last_name }}</fwb-table-cell>
          <fwb-table-cell>{{ user.first_name }}</fwb-table-cell>
          <fwb-table-cell>{{ user.email }}</fwb-table-cell>
          <fwb-table-cell>{{ RoleToPolishEnum[user.permission] }}</fwb-table-cell>
          <fwb-table-cell>{{ new Date(user.last_login_at).toUTCString() }}</fwb-table-cell>

          <fwb-table-cell>
            <div class="flex justify-center items-center gap-2">
              <fwb-button class="flowbite !p-2">
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

              <fwb-button class="flowbite !p-2">
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
  </section>
</template>
