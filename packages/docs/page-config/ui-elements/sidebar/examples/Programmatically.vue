<script setup>
  import { ref } from 'vue'

  const activeElement = ref('Address book')

  const items = [
    { title: 'Dashboard', icon: 'dashboard' },
    { title: 'Messages', icon: 'mail', children: [
      { title: 'Send', icon: 'send' },
      { title: 'Drafts', icon: 'drafts' },
    ] },
    { title: 'Address book', icon: 'room' },
    { title: 'Documents', icon: 'folder', children: [
      { title: 'Reports', icon: 'article' },
      { title: 'Notes', icon: 'note' },
    ] },
  ]
</script>

<template>
  <div style="height: 500px">
    <VaSidebar>
      <VaAccordion>
        <template v-for="item in items">
          <VaCollapse
            v-if="item.children"
            :key="item.title + 'collapse'"
            body-color="#00000022"
          >
            <template #header="{ value: isCollapsed }">
              <VaSidebarItem :active="item.children.some((child) => child.title === activeElement)">
                <VaSidebarItemContent>
                  <VaIcon :name="item.icon" />
                  <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                  <VaSpacer />
                  <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>

            <template #body>
              <VaSidebarItem
                v-for="child in item.children"
                :key="child.title"
                :active="child.title === activeElement"
                @click="activeElement = child.title"
              >
                <VaSidebarItemContent>
                  <VaIcon :name="child.icon" />
                  <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>
          </VaCollapse>

          <VaSidebarItem
            v-else
            :key="item.title + 'item'"
            :active="item.title === activeElement"
            @click="activeElement = item.title"
          >
            <VaSidebarItemContent>
              <VaIcon :name="item.icon" />
              <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </template>
      </VaAccordion>

      <VaSpacer />

      <VaSidebarItem
        :active="'Settings' === activeElement"
        @click="activeElement = 'Settings'"
      >
        <VaSidebarItemContent>
          <VaIcon name="settings" />
          <VaSidebarItemTitle>Settings</VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>
</template>
