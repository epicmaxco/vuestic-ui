<template>
  <div class="max-w-xs">
    <va-input
      v-model="value"
      counter
      class="mb-6"
    />
    <va-input
      v-model="value"
      :max-length="30"
      counter
      class="mb-6"
    />
    <va-input
      v-model="value"
      :max-length="30"
      counter
      class="mb-6"
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
    </va-input>
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