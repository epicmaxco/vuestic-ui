<template>
  <p>
    <va-button @click="showFirstModal = !showFirstModal">
      Show first modal
    </va-button>
    <va-modal v-model="showFirstModal" :message="firstMessage" hide-default-actions>
      <slot>
        <va-button @click="showSecondModal = !showSecondModal">
          Show second modal
        </va-button>
        <va-modal v-model="showSecondModal" :message="secondMessage" />
      </slot>
    </va-modal>
  </p>
</template>
<script>
export default {
  data () {
    return {
      showFirstModal: false,
      showSecondModal: false,
      firstMessage: 'First modal message',
      secondMessage: 'Second modal message',
    }
  },
}
</script>
