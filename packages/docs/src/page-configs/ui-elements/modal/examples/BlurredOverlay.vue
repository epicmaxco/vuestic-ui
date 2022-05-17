<template>
  <va-button class="mr-4  my-1" @click="showModalBlurred = !showModalBlurred">
    Show modal
  </va-button>
    <va-modal
    v-model="showModalBlurred"
    :message="message"
    blur
  />

  <va-button class="mr-4  my-1" @click="showModalBlurredCustom = !showModalBlurredCustom">
    Custom blur radius
  </va-button>
  <va-modal
    v-model="showModalBlurredCustom"
    :message="message"
    blur
  />
</template>

<script>
import message from './popup-message'

export default {
  data () {
    return {
      showModalBlurred: false,
      showModalBlurredCustom: false,
      message,
    }
  },
}
</script>
