<template>
  <va-tabs
    v-model="value"
    vertical
    grow
  >
    <template #tabs>
      <va-tab
        v-for="tab in tabs"
        :key="tab.title"
        :name="tab.title"
      >
        <va-icon
          :name="tab.icon"
          size="small"
          class="mr-2"
        />
        {{ tab.title }}
      </va-tab>
    </template>

    <va-card
      square
      outlined
    >
      <va-card-title>
        <va-icon
          :name="currentTab.icon"
          size="small"
          class="mr-2"
          color="background-tertiary"
        />
        {{ currentTab.title }}
      </va-card-title>
      <va-card-content>
        {{ currentTab.content }}
      </va-card-content>
    </va-card>
  </va-tabs>
</template>

<script>
const TABS = [
  { icon: "feed", title: "Feed", content: "Feed content" },
  { icon: "person", title: "Profile", content: "Profile content" },
  { icon: "mail", title: "Messages", content: "Messages content" },
  { icon: "tune", title: "Settings", content: "Settings content" },
];

export default {
  data: () => ({
    tabs: TABS,
    value: TABS[0].title,
  }),

  computed: {
    currentTab() {
      return this.tabs.find(({ title }) => title === this.value);
    },
  },
};
</script>
