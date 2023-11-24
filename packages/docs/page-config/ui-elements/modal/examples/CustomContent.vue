<template>
  <VaButton @click="showCustomContent = !showCustomContent">
    Show custom content modal (with image)
  </VaButton>

  <VaModal
    v-model="showCustomContent"
    no-padding
  >
    <template #content="{ ok }">
      <VaImage
        :ratio="16 / 9"
        src="https://picsum.photos/1500"
      />
      <VaCardContent>
        Classic modal overlay which represents a dialog box or other interactive
        component, such as a dismissible alert, sub-window, etc.
      </VaCardContent>
      <VaCardActions>
        <VaButton @click="ok">
          Apply
        </VaButton>
      </VaCardActions>
    </template>
  </VaModal>
</template>

<script>
export default {
  data() {
    return { showCustomContent: false };
  },
};
</script>
