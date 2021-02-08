<template>
  <p>
    <va-button @click="showModal = !showModal">
      Show modal (fullscreen)
    </va-button>
    <va-modal v-model="showModal" fullscreen />
  </p>
</template>
<script>
export default {
  data () {
    return {
      showModal: false,
    }
  },
}
</script>
