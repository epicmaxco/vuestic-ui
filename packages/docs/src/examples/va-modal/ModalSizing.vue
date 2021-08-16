<template>
  <div>
    <va-button class="mr-4 mb-2" @click="showModalSizeSmall = !showModalSizeSmall">
      {{ $t('api.VaModal.examples.size.small') }}
    </va-button>
    <va-button class="mr-4 mb-2" @click="showModalSizeMedium = !showModalSizeMedium">
      {{ $t('api.VaModal.examples.size.medium') }}
    </va-button>
    <va-button
      class="mb-2"
      @click="showModalSizeLarge = !showModalSizeLarge"
    >
      {{ $t('api.VaModal.examples.size.large') }}
    </va-button>
    <va-modal v-model="showModalSizeSmall" :message="message" size="small" />
    <va-modal v-model="showModalSizeMedium" :message="message" />
    <va-modal v-model="showModalSizeLarge" :message="message" size="large" />
  </div>
</template>

<script>
import message from './popup-message'

export default {
  data() {
    return {
      showModalSizeSmall: false,
      showModalSizeMedium: false,
      showModalSizeLarge: false,
      message,
    }
  },
}
</script>
