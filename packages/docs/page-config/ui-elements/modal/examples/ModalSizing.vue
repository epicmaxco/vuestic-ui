<template>
  <va-button
    class="mr-6 my-1"
    @click="showModalSizeSmall = !showModalSizeSmall"
  >
    Show modal size small
  </va-button>

  <va-button
    class="mr-6 my-1"
    @click="showModalSizeMedium = !showModalSizeMedium"
  >
    Show modal size medium (default)
  </va-button>

  <va-button
    class="my-1"
    @click="showModalSizeLarge = !showModalSizeLarge"
  >
    Show modal size large
  </va-button>

  <va-modal
    v-model="showModalSizeSmall"
    message="Would you like to save?"
    ok-text="Save"
  />

  <va-modal
    v-model="showModalSizeMedium"
    size="small"
  >
    <h3 class="va-h3">
      Medium
    </h3>
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </va-modal>

  <va-modal
    v-model="showModalSizeLarge"
    size="large"
  >
    <h3 class="va-h3">
      Party Hard
    </h3>

    <p class="va-text">
      Select users to go to a party.
    </p>

    <va-data-table
      style="width: 1000px"
      :items="[
        { name: 'Marcus Claus', email: 'marcus@epicmax.co', status: 'verified', balance: '$34.15' },
        { name: 'Moo Farah', email: 'moo@epicmax.co', status: 'pending', balance: '$199.0' },
        { name: 'Stan Brass', email: 'stan@epicmax.co', status: 'blocked', balance: '$0.00' },
        { name: 'Usan Jahallah', email: 'usan@epicmax.co', status: 'verified', balance: '$23 000.00' },
      ]"
    >
      <template #cell(status)="{ rowData }">
        <va-chip
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
        </va-chip>
      </template>
    </va-data-table>
  </va-modal>
</template>

<script>
export default {
  data() {
    return {
      showModalSizeSmall: false,
      showModalSizeMedium: false,
      showModalSizeLarge: false,
    };
  },
};
</script>
