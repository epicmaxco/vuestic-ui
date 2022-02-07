<template>
  <div>
    <va-slider v-model="value1">
      <template #prepend>
        <va-input type="number" v-model="value1"></va-input>
      </template>
    </va-slider>
    <va-slider v-model="value2">
      <template #append>
        <va-input type="number" v-model="value2"></va-input>
      </template>
    </va-slider>
    <va-slider v-model="value3">
      <template #label>
        <div style="font-style: italic; color: black;">LABEL SLOT</div>
      </template>
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
