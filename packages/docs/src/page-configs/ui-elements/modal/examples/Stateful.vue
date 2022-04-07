<template>
  <va-button @click="$refs.modal.show()">
    Show modal (stateful)
  </va-button>
  <va-modal ref="modal" stateful :message="message" />
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
