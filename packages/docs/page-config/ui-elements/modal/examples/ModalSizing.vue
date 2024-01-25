<template>
  <VaButton
    class="mr-6 my-1"
    @click="showModalSizeAuto = !showModalSizeAuto"
  >
    Show modal size small
  </VaButton>

  <VaButton
    class="mr-6 my-1"
    @click="showModalSizeSmall = !showModalSizeSmall"
  >
    Show modal size small
  </VaButton>

  <VaButton
    class="mr-6 my-1"
    @click="showModalSizeMedium = !showModalSizeMedium"
  >
    Show modal size medium (default)
  </VaButton>

  <VaButton
    class="my-1"
    @click="showModalSizeLarge = !showModalSizeLarge"
  >
    Show modal size large
  </VaButton>

  <VaModal
    v-model="showModalSizeAuto"
    message="Would you like to save?"
    ok-text="Save"
    size="auto"
  />

  <VaModal
    v-model="showModalSizeSmall"
    message="Would you like to save?"
    ok-text="Save"
    size="small"
  />

  <VaModal
    v-model="showModalSizeMedium"
    ok-text="Apply"
  >
    <h3 class="va-h3">
      Medium
    </h3>
    <p class="m-0">
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </VaModal>

  <VaModal
    v-model="showModalSizeLarge"
    size="large"
  >
    <h3 class="va-h3">
      Party Hard
    </h3>

    <p class="va-text">
      Select users to go to a party.
    </p>

    <VaDataTable
      :items="[
        { name: 'Marcus Claus', email: 'marcus@epicmax.co', status: 'verified', balance: '$34.15' },
        { name: 'Moo Farah', email: 'moo@epicmax.co', status: 'pending', balance: '$199.0' },
        { name: 'Stan Brass', email: 'stan@epicmax.co', status: 'blocked', balance: '$0.00' },
        { name: 'Usan Jahallah', email: 'usan@epicmax.co', status: 'verified', balance: '$23 000.00' },
      ]"
    >
      <template #cell(status)="{ rowData }">
        <VaChip
          :color="({
            verified: 'primary',
            pending: 'secondary',
            blocked: 'danger',
          })[rowData.status]"
          class="va-text-uppercase"
          size="small"
          square
        >
          {{ rowData.status }}
        </VaChip>
      </template>
    </VaDataTable>
  </VaModal>
</template>

<script>
export default {
  data() {
    return {
      showModalSizeAuto: false,
      showModalSizeSmall: false,
      showModalSizeMedium: false,
      showModalSizeLarge: false,
    };
  },
};
</script>
