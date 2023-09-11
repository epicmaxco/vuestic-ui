<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-input
      v-model="value"
      counter
      placeholder="With amount of letters"
    />
    <va-input
      v-model="value"
      :max-length="30"
      counter
      placeholder="With max number"
    />
    <va-input
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
