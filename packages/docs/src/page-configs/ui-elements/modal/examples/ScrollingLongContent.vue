<template>
  <va-button class="mr-4 my-1" @click="showModal = !showModal">
    Show modal with long content
  </va-button>
  <va-button class="mr-4 my-1" @click="showModalWithFixedLayout = !showModalWithFixedLayout">
    Show modal with long content and fixed layout
  </va-button>
  <va-modal v-model="showModal" :title="title" :message="message" />
  <va-modal
    v-model="showModalWithFixedLayout"
    :title="title"
    :message="message"
    fixed-layout
  />
</template>

<script>
import message from './popup-message'

export default {
  data () {
    return {
      showModal: false,
      showModalWithFixedLayout: false,
      title: 'Scrolling long content',
      message: Array(100).fill(message).join(' '),
    }
  },
}
</script>
