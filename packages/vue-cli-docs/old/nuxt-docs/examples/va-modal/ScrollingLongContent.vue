<template>
  <div>
    <va-button class="mr-2 mb-2" @click="showModal = !showModal">
      Show modal with long content
    </va-button>
    <va-button class="mr-2 mb-2" @click="showModalWithFixedLayout = !showModalWithFixedLayout">
      Show modal with long content and fixed layout
    </va-button>
    <va-modal v-model="showModal" :title="title" :message="message" />
    <va-modal
      v-model="showModalWithFixedLayout"
      :title="title"
      :message="message"
      fixed-layout
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      showModal: false,
      showModalWithFixedLayout: false,
      title: 'Scrolling long content',
      message: Array(100).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.').join(' '),
    }
  },
}
</script>
