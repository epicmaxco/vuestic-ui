<template>
  {{ value }}
  <br />
  <va-switch v-model="value" true-value="Agree" false-value="Disagree" />
</template>
<script>
export default {
  data () {
    return {
      value: 'Agree',
    }
  },
}
</script>
