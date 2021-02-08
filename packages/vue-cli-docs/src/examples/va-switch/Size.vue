<template>
  <div>
    <va-switch v-model="value" label="small" size="small" />
    <va-switch v-model="value" label="default" />
    <va-switch v-model="value" label="large" size="large" />
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
