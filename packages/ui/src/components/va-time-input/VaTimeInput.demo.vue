<template>
  <VbDemo>
    <VbCard title="default">
      <VaTimeInput v-model="value" />
    </VbCard>

    <VbCard title="manual input">
      <VaTimeInput v-model="value" manual-input />
    </VbCard>

    <VbCard title="without value">
      <VaTimeInput v-model="undefValue" manual-input />
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

    <VbCard title="period">
      <VaTimeInput :ampm="true" v-model="value" />
    </VbCard>

    <VbCard title="readonly and disabled">
      <VaTimeInput readonly v-model="value" />
      <VaTimeInput disabled v-model="value" />
    </VbCard>

    <VbCard title="validation">
      <VaTimeInput v-model="value" :rules="validationRules" />
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
      undefValue: undefined,
      validationRules: [(value) => value.getHours() > 12 || 'Should be PM'],
    }
  },
}
</script>

<style lang="scss" scoped>
  *:focus {
    border: 1px solid red;
  }
</style>
