<template>
  <va-button @click="showFirstModal = !showFirstModal"> Show modal </va-button>

  <va-modal v-model="showFirstModal" hide-default-actions>
    <div class="flex flex-col items-start gap-2">
      <h2 class="va-h2">Nested Modal</h2>

      <va-date-input prevent-overflow />

      <p class="va-text-secondary opacity-50">
        This example shows how overlapping modals work after you click save.
      </p>
    </div>

    <div class="flex justify-end mt-2">
      <va-button
        @click="showSecondModal = !showSecondModal"
      >
        Save
      </va-button>
    </div>
  </va-modal>

  <va-modal v-model="showSecondModal" message="Would you like to save?" @ok="showFirstModal = false" />
</template>

<script>
export default {
  data() {
    return {
      showFirstModal: false,
      showSecondModal: false,
    };
  },
};
</script>
