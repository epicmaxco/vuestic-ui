<template>
  <VaCard>
    <VaCardTitle>My Card</VaCardTitle>
    <VaCardContent class="flex gap-8 flex-col">
      <VaInput
        v-model="input"
        label="My Input"
      />
      <VaSelect
        v-model="select"
        :options="['one', 'two', 'three']"
        label="My Select"
      />
    </VaCardContent>
    <VaCardActions align="right">
      <VaButton>My Button</VaButton>
    </VaCardActions>
  </VaCard>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      input: undefined,
      select: undefined,
    }
  },
})
</script>
