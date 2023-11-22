<template>
  <VaTabs
    v-model="value"
    vertical
    grow
  >
    <template #tabs>
      <VaTab
        v-for="tab in tabs"
        :key="tab.title"
        :name="tab.title"
      >
        <VaIcon
          :name="tab.icon"
          size="small"
          class="mr-2"
        />
        {{ tab.title }}
      </VaTab>
    </template>

    <VaCard
      square
      outlined
    >
      <VaCardTitle>
        <VaIcon
          :name="currentTab.icon"
          size="small"
          class="mr-2"
          color="background-element"
        />
        {{ currentTab.title }}
      </VaCardTitle>
      <VaCardContent>
        {{ currentTab.content }}
      </VaCardContent>
    </VaCard>
  </VaTabs>
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
