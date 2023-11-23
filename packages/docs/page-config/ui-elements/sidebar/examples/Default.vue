<template>
  <div style="height: 500px">
    <VaSidebar>
      <VaSidebarItem>
        <VaSidebarItemContent>
          <VaIcon name="dashboard" />
          <VaSidebarItemTitle>Dashboard</VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>

      <VaAccordion>
        <VaCollapse body-color="#00000022">
          <template #header="{ value: isCollapsed }">
            <VaSidebarItem>
              <VaSidebarItemContent>
                <VaIcon name="mail" />
                <VaSidebarItemTitle>Messages</VaSidebarItemTitle>
                <VaSpacer />
                <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
              </VaSidebarItemContent>
            </VaSidebarItem>
          </template>

          <template #body>
            <VaSidebarItem>
              <VaSidebarItemContent>
                <VaIcon name="send" />
                <VaSidebarItemTitle>Send</VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>

            <VaSidebarItem>
              <VaSidebarItemContent>
                <VaIcon name="drafts" />
                <VaSidebarItemTitle>Drafts</VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </template>
        </VaCollapse>

        <VaSidebarItem active>
          <VaSidebarItemContent>
            <VaIcon name="room" />
            <VaSidebarItemTitle>Address book</VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaAccordion>

      <VaSpacer />

      <VaSidebarItem>
        <VaSidebarItemContent>
          <VaIcon name="settings" />
          <VaSidebarItemTitle>Settings</VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
    </VaSidebar>
  </div>
</template>
