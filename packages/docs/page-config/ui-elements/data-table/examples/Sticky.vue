<template>
  <div class="grid gap-10">
    <VaDataTable
      :items="items"
      sticky-header
      footer-clone
      height="180px"
    />

    <VaDataTable
      :items="items"
      :style="{
        '--va-data-table-height': '300px',
        '--va-data-table-thead-background': 'var(--va-background-element)',
        '--va-data-table-tfoot-background': 'var(--va-background-element)',
        '--va-data-table-thead-color': '#2C82E0',
      }"
      sticky-header
      footer-clone
      sticky-footer
    />

    <VaDataTable
      class="custom-table"
      :items="items"
      height="100%"
      sticky-header
      footer-clone
      sticky-footer
      :scroll-bottom-margin="20"
      @scroll:top="logger('--- scroll top ---')"
      @scroll:bottom="logger('--- scroll bottom ---')"
    >
      <template #headerPrepend>
        <tr>
          <th colspan="6">
            With scroll events
          </th>
        </tr>
      </template>
    </VaDataTable>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
      {
        id: 6,
        name: "Lindsey Hopkins",
        username: "Lindsey",
        email: "lindseyhopkins@nebulean.com",
        phone: "(254)954-1589",
        website: "nebulean.info",
      },
      {
        id: 7,
        name: "Head Lloyd",
        username: "Head",
        email: "headlloyd@nebulean.com",
        phone: "(254)954-1279",
        website: "nebulean.info",
      },
      {
        id: 8,
        name: "Fisher Bradford",
        username: "Bradford",
        email: "fisherbradford@nebulean.com",
        phone: "(254)954-5289",
        website: "nebulean.info",
      },
    ];

    return {
      items,
    };
  },

  methods: {
    logger(msg) {
      console.log(msg);
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.custom-table) {
  --va-data-table-thead-background:
    linear-gradient(
      0deg,
      var(--va-primary),
      var(--va-info)
    );
  --va-data-table-tfoot-background:
    linear-gradient(
      0deg,
      var(--va-info),
      var(--va-primary)
    );
  --va-data-table-max-height: 300px;
  --va-data-table-thead-color: var(--va-text-inverted);
  --va-data-table-tfoot-color: var(--va-text-inverted);
}
</style>
