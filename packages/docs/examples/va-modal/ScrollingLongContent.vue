<template>
  <div>
    <va-button @click="showModal = !showModal">
      Show modal with long content
    </va-button>
    <va-button @click="showModalWithFixedLayout = !showModalWithFixedLayout">
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
const loremString =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const lorem = (length) => {
  return [
    ...Array(Math.floor(length / loremString.length)).fill(loremString),
    loremString.slice(0, length % loremString.length),
  ].join(' ')
}

export default {
  data () {
    return {
      showModal: false,
      showModalWithFixedLayout: false,
      title: 'Scrolling long content',
      message:
        lorem(10000),
    }
  },
}
</script>
