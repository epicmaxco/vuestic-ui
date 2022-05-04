<template>
  <va-button class="mr-4  my-1" @click="showModalSizeSmall = !showModalSizeSmall">
    Show modal size small
  </va-button>
  <va-button class="mr-4  my-1" @click="showModalSizeMedium = !showModalSizeMedium">
    Show modal size medium (default)
  </va-button>
  <va-button class="my-1" @click="showModalSizeLarge = !showModalSizeLarge">
    Show modal size large
  </va-button>
  <va-modal
    v-model="showModalSizeSmall"
    :message="message"
    size="small"
  />
  <va-modal
    v-model="showModalSizeMedium"
    :message="message"
  />
  <va-modal
    v-model="showModalSizeLarge"
    :message="message"
    size="large"
  />
</template>

<script>
import message from './popup-message'

export default {
  data () {
    return {
      showModalSizeSmall: false,
      showModalSizeMedium: false,
      showModalSizeLarge: false,
      message,
    }
  },
}
</script>
