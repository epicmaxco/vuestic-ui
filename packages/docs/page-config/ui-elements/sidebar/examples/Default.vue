<template>
  <div style="height: 500px">
    <va-sidebar>
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-icon name="dashboard" />
          <va-sidebar-item-title>Dashboard</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-accordion>
        <va-collapse body-color="#00000022">
          <template #header="{ value: isCollapsed }">
            <va-sidebar-item>
              <va-sidebar-item-content>
                <va-icon name="mail" />
                <va-sidebar-item-title>Messages</va-sidebar-item-title>
                <va-spacer />
                <va-icon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
              </va-sidebar-item-content>
            </va-sidebar-item>
          </template>

          <va-sidebar-item>
            <va-sidebar-item-content>
              <va-icon name="send" />
              <va-sidebar-item-title>Send</va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>

          <va-sidebar-item>
            <va-sidebar-item-content>
              <va-icon name="drafts" />
              <va-sidebar-item-title>Drafts</va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </va-collapse>

        <va-sidebar-item active>
          <va-sidebar-item-content>
            <va-icon name="room" />
            <va-sidebar-item-title>Address book</va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </va-accordion>

      <va-spacer />

      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-icon name="settings" />
          <va-sidebar-item-title>Settings</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>
