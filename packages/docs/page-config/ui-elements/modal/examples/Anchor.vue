<template>
  <div class="row">
    <va-modal
      anchor-class="mr-6 my-1"
      stateful
    >
      <template #anchor="{ show }">
        <va-button @click="show">
          Anchor-button (stateful modal)
        </va-button>
      </template>
      <div>{{ message }}</div>
    </va-modal>

    <va-modal
      v-model="showModal"
      anchor-class="mr-6 my-1"
    >
      <template #anchor="{ show }">
        <va-button @click="show">
          Anchor-button (stateless modal)
        </va-button>
      </template>
      <div>{{ message }}</div>
    </va-modal>
  </div>
</template>

<script>
import message from "./popup-message";

export default {
  data() {
    return {
      showModal: false,
      message,
    };
  },
};
</script>
