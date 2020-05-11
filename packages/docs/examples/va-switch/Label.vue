<template>
  <div>
    <va-switch v-model="value" label="left" left-label />
    <va-switch v-model="value" label="right" />
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
