<template>
  <div>
    <va-button @click="showModal = !showModal">
      Show modal (custom rendering)
    </va-button>
    <va-modal
      v-model="showModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <template #header>
        <h2>Custom header</h2>
      </template>
      <slot>
        <div>{{ message }}</div>
      </slot>
      <template #footer>
        <va-button>
          Custom action
        </va-button>
      </template>
    </va-modal>
  </div>
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
