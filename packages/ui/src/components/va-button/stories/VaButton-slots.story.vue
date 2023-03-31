<template>
  <Story title="va-button/slots">
    <va-button icon-right="alarm" @click="isChecked = !isChecked">
      <template #prepend>
        <va-checkbox v-model="isChecked" color="secondary" readonly />
      </template>
      &nbsp;
      Button
    </va-button>
    <va-button>
      <template #prepend>prepend</template>
      -
      <template #append>append</template>
    </va-button>
  </Story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
import { VaCheckbox } from '../../va-checkbox'
import { ref } from 'vue'

const isChecked = ref(false)
</script>

<style scoped>
.va-button + .va-button {
  margin-left: 1rem;
}
</style>
