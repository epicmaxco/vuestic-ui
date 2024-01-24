<template>
  <VaButton @click="showFirstModal = !showFirstModal">
    Show modal
  </VaButton>

  <VaModal
    v-slot="{ hide }"
    v-model="showFirstModal"
    hide-default-actions
  >
    <div class="flex flex-col items-start gap-2">
      <h3 class="va-h3">
        Nested Modal
      </h3>

      <VaDateInput
        v-model="date"
        outline
      />

      <p class="va-text-secondary opacity-50">
        This example shows how overlapping modals work after you click save.
      </p>
    </div>

    <div class="flex justify-end mt-2 gap-2">
      <VaButton
        preset="secondary"
        color="secondary"
        @click="hide()"
      >
        Cancel
      </VaButton>
      <VaButton preset="primary" @click="setDefault">
        Set default
      </VaButton>
      <VaButton
        @click="showSecondModal = !showSecondModal"
      >
        Save
      </VaButton>
    </div>
  </VaModal>

  <VaModal
    v-model="showSecondModal"
    message="Are you sure you want to save it?"
    ok-text="Save"
    size="small"
    @ok="showFirstModal = false"
  />
</template>

<script>
export default {
  data() {
    return {
      showFirstModal: false,
      showSecondModal: false,
      date: new Date(),
    };
  },
  methods: {
    setDefault() {
      this.date = new Date();
      this.$vaToast.init({
        message: 'Date was set to default',
        color: '#222222',
      })
    }
  }
};
</script>
