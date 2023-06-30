<template>
  <va-button @click="showCustomContent = !showCustomContent">
    Show custom content modal
  </va-button>
  <va-modal
    v-model="showCustomContent"
    no-padding
  >
    <template #content="{ ok }">
      <va-image
        :ratio="16 / 9"
        src="https://picsum.photos/1500"
      />
      <va-card-title> Title! </va-card-title>
      <va-card-content>
        Classic modal overlay which represents a dialog box or other interactive
        component, such as a dismissible alert, sub-window, etc.
      </va-card-content>
      <va-card-actions>
        <va-button
          @click="ok"
        >
          Ok!
        </va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>

<script>
export default {
  data() {
    return { showCustomContent: false };
  },
};
</script>
