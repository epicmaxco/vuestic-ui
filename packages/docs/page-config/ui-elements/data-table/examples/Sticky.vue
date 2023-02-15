<template>
  <div class="sticky-table-example">
    <va-data-table
      :items="items"
      footer-clone
      height="180px"
    />

    <va-data-table
      :items="items"
      sticky-header
      footer-clone
      height="180px"
    />

    <va-data-table
      :items="items"
      :style="{
        '--va-data-table-height': '300px',
        '--va-data-table-thead-background': 'var(--va-secondary)',
        '--va-data-table-tfoot-background': 'var(--va-background-element)',
        '--va-data-table-thead-color': 'var(--va-warning)',
      }"
      sticky-header
      footer-clone
      sticky-footer
    >
      <template #headerAppend>
        <tr>
          <th colspan="1">
            #
          </th>
          <th colspan="2">
            User info
          </th>
          <th colspan="3">
            Contact info
          </th>
        </tr>
      </template>
      <template #footerPrepend>
        <tr>
          <th colspan="6">
            Additional data in the footer prepend slot
          </th>
        </tr>
      </template>
    </va-data-table>

    <va-data-table
      class="my-custom-table-class"
      :items="items"
      height="100%"
      sticky-header
      footer-clone
      sticky-footer
      :scroll-bottom-margin="20"
      @scroll:top="logger"
      @scroll:bottom="onScrollDown"
    >
      <template #headerPrepend>
        <tr>
          <th colspan="6">
            With scroll events
          </th>
        </tr>
      </template>
      <template
        v-if="isLoading"
        #bodyAppend
      >
        <tr>
          <td colspan="6">
            <va-inner-loading
              :loading="isLoading"
              style="height: 2rem;"
            />
          </td>
        </tr>
      </template>
    </va-data-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const users = [
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
      items: users,
      isLoading: false,
    };
  },

  methods: {
    logger() {
      console.log("--- scroll top ---");
    },
    onScrollDown() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.loadUsers();
        this.isLoading = false;
      }, 1500);
    },
    loadUsers() {
      const lastId = this.items[this.items.length - 1].id;
      const uploadedUser = {
        name: "New User",
        username: "NewUser",
        email: "newUser@nebulean.com",
        phone: "(254)954-5289",
        website: "nebulean.info",
      };
      const loadedUsers = [1, 2, 3].map((id) => ({
        ...uploadedUser,
        id: lastId + id,
      }));
      this.items = [...this.items, ...loadedUsers];
    },
  },
});
</script>

<style lang="scss">
.sticky-table-example {
  .va-data-table {
    border: 1px solid var(--va-background-element);
  }

  .va-data-table + .va-data-table {
    margin-top: 2rem;
  }

  .my-custom-table-class {
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
    --va-data-table-max-height: 250px;
    --va-data-table-thead-color: var(--va-text-inverted);
    --va-data-table-tfoot-color: var(--va-text-inverted);
  }
}
</style>
