<template>
  <story title="va-button/slots">
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
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
import { VaCheckbox } from '../../va-checkbox/index'
import { ref } from 'vue'

const isChecked = ref(false)
</script>
