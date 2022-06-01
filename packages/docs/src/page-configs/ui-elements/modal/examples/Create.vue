<template>
  <va-button class="mr-4 my-1"
    @click="$vaModal.init({
      title: 'Click Event',
      message: 'Modal from plugin',
      blur: true,
      onOk: () => logAction('clicked OK'),
      onCancel: () => logAction('clicked CANCEL'),
    })"
  >
    Create modal (Options API)
  </va-button>

  <va-button class="mr-4 my-1"
    @click="init('Modal from hook')"
  >
    Create modal (Composition API)
  </va-button>
</template>

<script>
import { defineComponent } from 'vue'
import { useModal } from 'vuestic-ui/src/main'
import message from './popup-message'

export default defineComponent({
  setup () {
    const { init } = useModal()

    return {
      message,
      init,
      logAction: (action) => console.log(action),
    }
  },
})
</script>
