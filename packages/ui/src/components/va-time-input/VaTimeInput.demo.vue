<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimeInput v-model="value" />
    </VbCard>

    <VbCard title="slots">
      <VaTimeInput v-model="value">
        <template #appendInner>
          <va-icon name="schedule" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value">
        <template #append>
          <va-icon name="schedule" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value">
        <template #prepend>
          <va-icon name="schedule" />
        </template>
      </VaTimeInput>
      <VaTimeInput v-model="value">
        <template #prependInner>
          <va-icon name="schedule" />
        </template>
      </VaTimeInput>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTimeInput from './VaTimeInput.vue'

export default {
  components: {
    VaTimeInput,
  },

  data () {
    return {
      value: new Date(2021, 2, 20, 23, 5, 53),
      period: false,
    }
  },
}
</script>
