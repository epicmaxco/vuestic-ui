<template>
  <VaButton
    class="mr-6 my-1"
    @click="showModal = !showModal"
  >
    Show modal with long content
  </VaButton>

  <VaButton
    class="mr-6 my-1"
    @click="showModalWithFixedLayout = !showModalWithFixedLayout"
  >
    Show modal with long content and fixed layout
  </VaButton>

  <VaModal
    v-model="showModal"
    max-height="300px"
    ok-text="Confirm"
  >
    <VaDataTable
      :items="items"
    >
      <h3 class="va-h3">
        Contacts
      </h3>
      <template #cell(img)="{ rowData }">
        <VaAvatar :src="rowData.img" />
      </template>
    </VaDataTable>
  </VaModal>

  <VaModal
    v-model="showModalWithFixedLayout"
    max-height="300px"
    ok-text="Confirm"
    fixed-layout
  >
    <h3 class="va-h3">
      Contacts
    </h3>
    <VaDataTable
      :items="items"
    >
      <template #cell(img)="{ rowData }">
        <VaAvatar :src="rowData.img" />
      </template>
    </VaDataTable>
  </VaModal>
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
