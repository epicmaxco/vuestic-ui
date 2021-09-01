<template>
  <div>
    <va-button class="mr-4 mb-2" @click="showModal = !showModal">
      {{ $t('api.VaModal.examples.long') }}
    </va-button>
    <va-button
      class="mb-2"
      @click="showModalWithFixedLayout = !showModalWithFixedLayout"
    >
      {{ $t('api.VaModal.examples.longAndFixed') }}
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
import message from './popup-message'

export default {
  data () {
    return {
      showModal: false,
      showModalWithFixedLayout: false,
      title: 'Scrolling long content',
      message: Array(100)
        .fill(message)
        .join(' '),
    }
  },
}
</script>
