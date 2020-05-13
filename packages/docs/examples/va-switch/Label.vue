<template>
  <div>
    <va-switch class="ml-2" v-model="value" label="left" left-label />
    <va-switch class="ml-2" v-model="value" label="right" />
    <va-switch class="ml-2" v-model="value">
      labeled by slot
    </va-switch>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
