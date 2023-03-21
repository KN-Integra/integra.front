<script lang="ts">
export default {
  name: 'AcademicYear',
  setup() {
    const startYear = new Date().getMonth() < 7 ? new Date().getFullYear() - 1 : new Date().getFullYear()
    const endYear = startYear + 1

    return {
      academicYear: `${startYear}/${endYear}`
    }
  }
}
</script>

<template>
  <span>
    {{ academicYear }}
  </span>
</template>
