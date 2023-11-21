<template>
  <VaButton
    class="mr-6 my-1"
    @click="
      $vaModal.init({
        title: 'Click Event',
        message: 'Modal from plugin',
        blur: true,
        onOk: () => logAction('clicked OK'),
        onCancel: () => logAction('clicked CANCEL'),
      })
    "
  >
    Create modal (Options API)
  </VaButton>

  <VaButton
    class="mr-6 my-1"
    @click="init('Modal from hook')"
  >
    Create modal (Composition API)
  </VaButton>
</template>

<script>
import { defineComponent } from "vue";
import { useModal } from "vuestic-ui";
import message from "./popup-message";

export default defineComponent({
  setup() {
    const { init } = useModal();

    return {
      message,
      init,
      logAction: (action) => console.log(action),
    };
  },
});
</script>
