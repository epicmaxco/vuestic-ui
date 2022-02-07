<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-hover v-model="value">
        <va-button color="success" :flat="value">
          {{ value }}
        </va-button>
      </va-hover>
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
