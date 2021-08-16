<template>
  <VbDemo>
    <VbCard title="default">
      <va-hover v-model="value">
        <div class="demo-block">
          {{ value }}
        </div>
      </va-hover>
      <input
        type="checkbox"
        v-model="value"
      >
    </VbCard>
    <VbCard title="stateful + slot">
      <va-hover stateful #default="{ hover }">
        <div class="demo-block">
          {{ hover }}
        </div>
      </va-hover>
    </VbCard>
    <VbCard title="disabled">
      <va-hover
        disabled
        stateful
        #default="{ hover }"
      >
        <div class="demo-block">
          slot - {{ hover }}
        </div>
      </va-hover>
      <br>
      <va-hover
        disabled
        v-model="valueDisabled"
      >
        <div class="demo-block">
          value - {{ valueDisabled }}
        </div>
      </va-hover>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaHover from './index'

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

<style scoped>
.demo-block {
  background-color: #babfc2;
  width: 100px;
  height: 100px;
}
</style>
