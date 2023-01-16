<template>
  <div class="mb-6" style="height: 16rem; overflow: hidden;">
    <va-sidebar
      color="primary"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <va-sidebar-item active-color="backgroundPrimary">
        <va-sidebar-item-content>
          <va-sidebar-item-title style="white-space: normal;">
            background primary and white text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-6" style="height: 16rem; overflow: hidden;">
    <va-sidebar
      color="background-element"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-sidebar-item-title style="white-space: normal;">
            background dark and auto text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-6" style="height: 16rem; overflow: hidden;">
    <va-sidebar
      color="#F0F7ED"
      text-color="#009600"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <va-sidebar-item active-color="#F0F7ED">
        <va-sidebar-item-content>
          <va-sidebar-item-title style="white-space: normal;">
            background success and auto text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="#009600"
        :text-color="item.active ? '#F0F7ED' : '#009600'"
        :hover-opacity="item.active ? 0.75 : 0.2"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-6" style="height: 16rem;">
    <va-sidebar
      color="#FFD300"
      active-color="#FFD300"
      text-color="textPrimary"
      minimized-width="64px"
      width="18rem"
      class="colored-sidebar"
    >
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-sidebar-item-title style="white-space: normal;">
            background danger and success text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="textPrimary"
        :text-color="item.active ? '#FFD300' : 'textPrimary'"
        :hover-opacity="item.active ? 0.75 : 0.2"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
    }
  },
}
</script>

<style>
.colored-sidebar .va-sidebar__menu {
  overflow: hidden;
}
</style>
