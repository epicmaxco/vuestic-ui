<template>
  <va-button
    class="mr-6 my-1"
    @click="$refs.statefulModal.show()"
  >
    Show modal (stateful)
  </va-button>
  <va-button
    class="mr-6 my-1"
    @click="$refs.statelessModal.show()"
  >
    Show modal (stateless)
  </va-button>
  <va-modal
    ref="statefulModal"
    :message="message"
    stateful
  />
  <va-modal
    ref="statelessModal"
    v-model="showStatefulModal"
    :message="message"
  />
</template>

<script>
import message from "./popup-message";

export default {
  data() {
    return {
      showStatefulModal: false,
      message,
    };
  },
};
</script>
