<template>
  <div
    class="mb-6 h-64 overflow-hidden"
  >
    <VaSidebar
      color="primary"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <VaSidebarItem active-color="backgroundPrimary">
        <VaSidebarItemContent>
          <VaSidebarItemTitle style="white-space: normal;">
            background primary and white text color
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
      >
        <VaSidebarItemContent>
          <VaIcon :name="item.icon" />
          <VaSidebarItemTitle>
            {{ item.title }}
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>

  <div
    class="mb-6 h-64 overflow-hidden"
  >
    <VaSidebar
      color="background-element"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <VaSidebarItem>
        <VaSidebarItemContent>
          <VaSidebarItemTitle class="whitespace-normal">
            background dark and auto text color
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
      >
        <VaSidebarItemContent>
          <VaIcon :name="item.icon" />
          <VaSidebarItemTitle>
            {{ item.title }}
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>

  <div
    class="mb-6 h-52 overflow-hidden"
  >
    <VaSidebar
      color="#F0F7ED"
      text-color="#009600"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <VaSidebarItem active-color="#F0F7ED">
        <VaSidebarItemContent>
          <VaSidebarItemTitle class="whitespace-normal">
            background success and auto text color
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="#009600"
        :text-color="item.active ? '#F0F7ED' : '#009600'"
        :hover-opacity="item.active ? 0.75 : 0.2"
      >
        <VaSidebarItemContent>
          <VaIcon :name="item.icon" />
          <VaSidebarItemTitle>
            {{ item.title }}
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>

  <div
    class="mb-6 h-52"
  >
    <VaSidebar
      color="#FFD300"
      active-color="#FFD300"
      text-color="textPrimary"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <VaSidebarItem>
        <VaSidebarItemContent>
          <VaSidebarItemTitle class="whitespace-normal">
            background danger and success text color
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
      <VaSidebarItem
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="textPrimary"
        :text-color="item.active ? '#FFD300' : 'textPrimary'"
        :hover-opacity="item.active ? 0.75 : 0.2"
      >
        <VaSidebarItemContent>
          <VaIcon :name="item.icon" />
          <VaSidebarItemTitle>
            {{ item.title }}
          </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "dashboard" },
        { title: "Sidebar demo", icon: "room", active: true },
        { title: "Loop", icon: "loop" },
      ],
    };
  },
};
</script>

<style>
.colored-sidebar .va-sidebar__menu {
  overflow: hidden;
}
</style>
