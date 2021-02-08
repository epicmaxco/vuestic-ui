<template>
  <div>
    <va-slider v-model="value1">
      <va-input type="number" slot="prepend" v-model="value1"></va-input>
    </va-slider>
    <va-slider v-model="value2">
      <va-input type="number" slot="append" v-model="value2"></va-input>
    </va-slider>
    <va-slider v-model="value3">
      <div style="font-style: italic; color: black;" slot="label">LABEL SLOT</div>
    </va-slider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 45,
      value2: 45,
      value3: 45,
    }
  },
}
</script>
