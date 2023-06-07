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

  <va-button class="my-1" @click="showModalSizeLarge = !showModalSizeLarge">
    Show modal size large
  </va-button>

  <va-modal v-model="showModalSizeSmall" message="Would you like to save?" />

  <va-modal v-model="showModalSizeMedium" size="small">
    <h2 class="va-h2">Medium</h2>
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </va-modal>

  <va-modal v-model="showModalSizeLarge" size="large">
    <h2 class="va-h2">Party Hard</h2>

    <p>Select users to go to a party.</p>

    <va-data-table
      style="width: 1000px"
      :items="[
        { name: 'John', age: 21, email: 'john@example.com', verified: true },
        { name: 'Jane', age: 22, email: 'jane@example.com', verified: false },
        { name: 'Joe', age: 23, email: 'joe@example.com', verified: true },
      ]"
    >
      <template #cell(verified)="{ rowData }">
        <va-chip :color="rowData.verified ? 'success' : 'danger'">
          <va-icon name="check" v-if="rowData.verified" />
          <va-icon name="close" v-else />
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
