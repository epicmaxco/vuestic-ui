<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-hover v-slot:default="{ hover }">
        <div class="background--secondary">
          {{ hover }}
        </div>
      </va-hover>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hover: false,
    }
  },
}
</script>
