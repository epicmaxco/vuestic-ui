<template>
  <VaList>
    <VaListLabel> Clickable </VaListLabel>

    <VaListItem
      v-for="(contact, index) in contacts"
      :key="index"
      class="list__item"
      to="/"
    >
      <VaListItemSection avatar>
        <VaAvatar>
          <img :src="contact.img" :alt="contact.name">
        </VaAvatar>
      </VaListItemSection>

      <VaListItemSection>
        <VaListItemLabel>
          {{ contact.name }}
        </VaListItemLabel>

        <VaListItemLabel caption>
          {{ contact.address }}
        </VaListItemLabel>
      </VaListItemSection>

      <VaListItemSection icon>
        <VaIcon
          name="remove_red_eye"
          color="background-element"
        />
      </VaListItemSection>
    </VaListItem>
  </VaList>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          name: "Audrey Clay",
          address: "644 Vermont Court, Freelandville, Kentucky, 2619",
          img: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        {
          name: "Aguirre Klein",
          address: "626 Carroll Street, Roulette, Ohio, 1477",
          img: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "Tucker Kaufman",
          address: "887 Winthrop Street, Tryon, Florida, 3912",
          img: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          name: "Herbert Keller",
          address: "286 NW. Shore St.Longwood, FL 32779",
          img: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.list__item + .list__item {
  margin-top: 20px;
}
</style>
