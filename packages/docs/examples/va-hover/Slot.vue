<template>
  <va-hover v-slot:default="{ hover }">
    <div style="background-color: #babfc2;">
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
