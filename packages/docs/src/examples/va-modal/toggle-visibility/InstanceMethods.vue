<template>
  <va-content>
    <va-button class="mr-4 mb-2" @click="$refs.statefulModal.show()">
      {{ $t('all.showModal') }}
      {{ $t('api.VaModal.examples.statefulButton') }}
    </va-button>
    <va-button class="mb-2" @click="$refs.statelessModal.show()">
      {{ $t('all.showModal') }}
      {{ $t('api.VaModal.examples.statelessButton') }}
    </va-button>
    <va-modal ref="statefulModal" :message="message" stateful />
    <va-modal
      ref="statelessModal"
      :message="message"
      v-model="showStatefulModal"
    />
  </va-content>
</template>

<script>
import message from '../popup-message'

export default {
  data() {
    return {
      showStatefulModal: false,
      message,
    }
  },
}
</script>
