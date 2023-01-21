<template>
  <va-button @click="showModal = !showModal">
    Show modal (fullscreen)
  </va-button>
  <va-modal v-model="showModal" fullscreen :message="message" hide-default-actions />
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
