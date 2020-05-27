<template>
  <va-hover v-slot:default="{ hover }">
    <div class="background--secondary">
      {{ hover }}
    </div>
  </va-hover>
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
