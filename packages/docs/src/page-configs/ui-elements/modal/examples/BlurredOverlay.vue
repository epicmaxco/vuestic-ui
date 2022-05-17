<template>
  <va-button @click="showModal = !showModal">
    Show modal
  </va-button>

  <va-modal
    v-model="showModal"
    :message="message"
    blur
  />
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
