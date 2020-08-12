<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-hover #default="{ hover }">
        <va-button :color="hover ? 'danger' : 'primary'">
          {{ hover }}
        </va-button>
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
