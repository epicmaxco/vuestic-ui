<template>
  <va-date-picker
    label="Inline"
    v-model="value"
    :config="{inline: true}"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '2020-08-09',
    }
  },
}
</script>
