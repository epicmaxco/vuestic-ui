<template>
  <va-scroll-container
    class="max-h-52"
    vertical
  >
    <va-list>
      <va-list-label> Contacts </va-list-label>

      <va-list-item
        v-for="(contact, index) in contacts"
        :key="index"
        class="list__item"
      >
        <va-list-item-section avatar>
          <va-avatar>
            <img
              :src="contact.img"
              alt=""
            >
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            {{ contact.name }}
          </va-list-item-label>

          <va-list-item-label caption>
            {{ contact.address }}
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="background-tertiary"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>
  </va-scroll-container>
</template>

<script setup>
const contacts = [
  {
    name: "Luke Skywalker",
    address: "644 Vermont Court, Freelandville, Kentucky, 2619",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "C-3PO",
    address: "626 Carroll Street, Roulette, Ohio, 1477",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Obi-Wan Kenobi",
    address: "887 Winthrop Street, Tryon, Florida, 3912",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Jabba Desilijic Tiure",
    address: "286 NW. Shore St.Longwood, FL 32777",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Yoda",
    address: "353 NW. Shore St.Longwood, FL 32778",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Darth Vader",
    address: "265 NW. Shore St.Longwood, FL 32779",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];
</script>

<style lang="scss" scoped>
.list__item + .list__item {
  margin-top: 20px;
}
</style>
