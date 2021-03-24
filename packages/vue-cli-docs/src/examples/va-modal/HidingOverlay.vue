<template>
  <p>
    <va-button class="mr-2 mb-2" @click="showModal = !showModal">
      Show modal (without the overlay)
    </va-button>
    <va-button class="mr-2 mb-2" @click="showModalNoOutsideDismiss = !showModalNoOutsideDismiss">
      Show modal (without the overlay and with no outside click dismiss)
    </va-button>
    <va-modal v-model="showModal" :overlay="false" />
    <va-modal v-model="showModalNoOutsideDismiss" :overlay="false" no-outside-dismiss />
  </p>
</template>
<script>
export default {
  data () {
    return {
      showModal: false,
      showModalNoOutsideDismiss: false,
    }
  },
}
</script>
