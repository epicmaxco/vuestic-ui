<template>
  <div class="flex lg6 xs12">
    <div class="mt-2 mb-5">
      <va-progress-circle :value="value" />
    </div>
    <div class="row mb-4 mx-0 flex lg8 xs12">
      <va-slider v-model="value" />
      <span class="ml-4">{{ `${value}%`}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 65,
    }
  },
}
</script>
