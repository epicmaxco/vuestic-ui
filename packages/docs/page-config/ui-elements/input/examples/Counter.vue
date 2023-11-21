<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="value"
      counter
      placeholder="With amount of letters"
    />
    <VaInput
      v-model="value"
      :max-length="30"
      counter
      placeholder="With max number"
    />
    <VaInput
      v-model="value"
      :max-length="30"
      counter
      placeholder="Custom counter"
    >
      <template #counter="{ valueLength, maxLength }">
        <b
          class="ml-auto"
          :style="{
            color:
              valueLength > maxLength
                ? 'var(--va-danger)'
                : 'var(--va-success)',
          }"
        >
          {{ maxLength - valueLength }}
        </b>
      </template>
    </VaInput>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    data() {
      return {
        value: '',
      }
    }
  })
</script>
