<template>
  <va-button @click="showModal = !showModal">
    Show modal (default)
  </va-button>
  <va-modal v-model="showModal" :message="message" title="Overview" />
</template>

<script>
import message from './popup-message'

export default {
  data () {
    return {
      showModal: false,
      message,
    }
  },
}
</script>
