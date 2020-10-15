<template>
  <VbDemo>
    <VbCard title="default">
      <va-hover v-model="value">
        <div style="background-color: #babfc2;">
          {{ value }}
        </div>
      </va-hover>
      <input
        type="checkbox"
        v-model="value"
      >
    </VbCard>
    <VbCard title="slot access">
      <va-hover #default="{ hover }">
        <div style="background-color: #babfc2;">
          {{ hover }} value
        </div>
      </va-hover>
    </VbCard>
    <VbCard title="disabled">
      <va-hover
        disabled
        #default="{ hover }"
      >
        <div style="background-color: #babfc2;">
          slot - {{ hover }}
        </div>
      </va-hover>
      <va-hover
        disabled
        v-model="value"
      >
        <div style="background-color: #babfc2;">
          value - {{ valueDisabled }}
        </div>
      </va-hover>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaHover from './VaHover'

export default {
  components: {
    VaHover,
  },
  data () {
    return {
      value: false,
      valueDisabled: false,
    }
  },
}
</script>
