<template>
  <va-data-table
    :items="items"
    :columns="columns"
  >
    <template #cell(actions)="{ row, isExpanded }">
      <va-button
        @click="row.toggleRowDetails()"
        :icon="isExpanded ? 'va-arrow-up': 'va-arrow-down'"
        preset="secondary"
        class="w-full"
      >
        {{ isExpanded ? 'Hide': 'More info' }}
      </va-button>
    </template>

    <template #expandableRow="{ rowData }">
      <div class="flex gap-2">
        <va-avatar :src="`https://randomuser.me/api/portraits/men/${rowData.id}.jpg`"/>
        <div class="pl-2">
          <div class="flex gap-1">
            <span>{{ rowData.name }}</span>
            <span class="va-link">@{{ rowData.username }}</span>
          </div>
          <div class="flex items-center">
            <va-icon size="small" name="phone" color="secondary" class="mr-2" />
            <span>{{ rowData.phone }}</span>
          </div>
          <div class="flex items-center">
            <va-icon size="small" name="email" color="secondary" class="mr-2" />
            <span>{{ rowData.email }}</span>
          </div>
          <div class="flex items-center">
            <va-icon size="small" name="language" color="secondary" class="mr-2" />
            <span class="va-link">{{ rowData.website }}</span>
          </div>
        </div>
      </div>
    </template>
  </va-data-table>
</template>

<style>
  .va-data-table__table-tr--expanded td {
    background: var(--va-background-border);
  }

  .va-data-table__table-expanded-content td {
    background-color: var(--va-background-element);
  }
</style>

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
        phone: "1-770-736-8031",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593",
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
        phone: "493-170-9623",
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
    ];

    const columns = [
      { key: "name" },
      { key: "username" },
      { key: "email" },
      { key: "actions", width: 80 },
    ];

    return {
      items: users,
      columns
    };
  },
});
</script>
