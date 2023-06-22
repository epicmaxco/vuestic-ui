<template>
  <va-button
    class="mr-6 my-1"
    @click="showModal = !showModal"
  >
    Show modal with long content
  </va-button>

  <va-button
    class="mr-6 my-1"
    @click="showModalWithFixedLayout = !showModalWithFixedLayout"
  >
    Show modal with long content and fixed layout
  </va-button>

  <va-modal
    v-model="showModal"
    max-height="300px"
  >
    <va-data-table
      :items="items"
    >
      <h3 class="va-h3">Contacts</h3>
      <template #cell(img)="{ rowData }">
        <va-avatar :src="rowData.img" />
      </template>
    </va-data-table>
  </va-modal>

  <va-modal
    v-model="showModalWithFixedLayout"
    max-height="300px"
    fixed-layout
  >
    <h3 class="va-h3">Contacts</h3>
    <va-data-table
      :items="items"
    >
      <template #cell(img)="{ rowData }">
        <va-avatar :src="rowData.img" />
      </template>
    </va-data-table>
  </va-modal>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      showModalWithFixedLayout: false,

      items: [
        {
          img: "https://randomuser.me/api/portraits/women/5.jpg",
          name: "Audrey Clay",
          address: "644 Vermont Court, Freelandville, Kentucky, 2619",
        },
        {
          img: "https://randomuser.me/api/portraits/men/1.jpg",
          name: "Aguirre Klein",
          address: "626 Carroll Street, Roulette, Ohio, 1477",
        },
        {
          img: "https://randomuser.me/api/portraits/men/3.jpg",
          name: "Tucker Kaufman",
          address: "887 Winthrop Street, Tryon, Florida, 3912",
        },
        {
          img: "https://randomuser.me/api/portraits/men/5.jpg",
          name: "Herbert Keller",
          address: "286 NW. Shore St.Longwood, FL 32779",
        },
      ]
    };
  },
};
</script>
