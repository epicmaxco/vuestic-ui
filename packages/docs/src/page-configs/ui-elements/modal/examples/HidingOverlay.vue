<template>
  <va-button class="mr-4 my-1" @click="showModal = !showModal">
    Show modal (without the overlay)
  </va-button>
  <va-button class="mr-4 my-1" @click="showModalNoOutsideDismiss = !showModalNoOutsideDismiss">
    Show modal (without the overlay and with no outside click dismiss)
  </va-button>
  <va-modal v-model="showModal" :message="message" :overlay="false" />
  <va-modal v-model="showModalNoOutsideDismiss" :message="message" :overlay="false" no-outside-dismiss />
</template>

<script>
import message from './popup-message'

export default {
  data () {
    return {
      showModal: false,
      showModalNoOutsideDismiss: false,
      message,
    }
  },
}
</script>
