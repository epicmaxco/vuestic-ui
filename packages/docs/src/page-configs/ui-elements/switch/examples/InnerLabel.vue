<template>
  <div>
    <va-switch v-model="value" true-inner-label="Agree" false-inner-label="Disagree" class="mr-4" />
    <va-switch v-model="value" class="mr-4">
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
