<template>
  <div>
    <va-switch v-model="value" true-label="Agree" false-label="Disagree" />
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
