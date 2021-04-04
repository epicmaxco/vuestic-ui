<template>
  <p>
    <va-button @click="showModal = !showModal">
      Show modal (without animations)
    </va-button>
    <va-modal v-model="showModal" without-transitions />
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
