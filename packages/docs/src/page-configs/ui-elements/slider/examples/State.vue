<template>
  <va-slider label="Disabled" v-model="value1" :disabled="isState" />
  <va-slider label="Readonly" v-model="value2" :readonly="isState" />
  <va-checkbox class="mt-2" v-model="isState" label="States enabled" />
</template>

<script>
export default {
  data () {
    return {
      value1: 33,
      value2: 66,
      isState: true,
    }
  },
}
</script>
