<template>
  <VaModal
    v-model="doShowModal"
  >
    <template #anchor="{ show }">
      <VaButton @click="show">
        Anchor-button
      </VaButton>
    </template>
    
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </VaModal>
</template>

<script>
export default {
  data() {
    return {
      doShowModal: false,
    };
  },
};
</script>
