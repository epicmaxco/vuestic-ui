<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-hover v-model="value">
        <div class="background--secondary">
          {{ value }}
        </div>
      </va-hover>
      <va-checkbox v-model="value" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
    }
  },
}
</script>
