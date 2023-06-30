<template>
  <va-modal
    v-model="doShowModal"
  >
    <template #anchor="{ show }">
      <va-button @click="show">
        Anchor-button
      </va-button>
    </template>
    
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </va-modal>
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
