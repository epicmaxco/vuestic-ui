<template>
  <VaDataTable
    :items="items"
    :wrapper-size="400"
    :item-size="46"
    virtual-scroller
    sticky-header
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => {
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
    ];

    return {
      items: new Array(1000).fill(null).map((_, idx) => {
        const u = { ...(idx % 2 ? users[0] : users[1]) };
        u.id = idx;
        return u;
      }),
    };
  },
});
</script>
