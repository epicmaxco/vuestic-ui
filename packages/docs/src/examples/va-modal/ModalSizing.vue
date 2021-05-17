<template>
  <div>
    <va-button class="mr-4" @click="showModalSizeSmall = !showModalSizeSmall">
      Show modal size small
    </va-button>
    <va-button class="mr-4" @click="showModalSizeMedium = !showModalSizeMedium">
      Show modal size medium (default)
    </va-button>
    <va-button class="mr-2 mb-2" @click="showModalSizeLarge = !showModalSizeLarge">
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
  </div>
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
