<template>
  <div>
    <va-switch v-model="value" true-inner-label="Agree" false-inner-label="Disagree" />
    <va-switch v-model="value">
      <template #innerLabel>
        Inner Label
      </template>
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
