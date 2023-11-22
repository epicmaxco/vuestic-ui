<template>
  <VaSidebarItem hover-color="success">
    <VaSidebarItemContent>
      <VaSidebarItemTitle> Success hover color </VaSidebarItemTitle>
    </VaSidebarItemContent>
  </VaSidebarItem>

  <VaSidebarItem text-color="danger">
    <VaSidebarItemContent>
      <VaSidebarItemTitle> Danger text color </VaSidebarItemTitle>
    </VaSidebarItemContent>
  </VaSidebarItem>

  <VaSidebarItem
    active
    active-color="warning"
  >
    <VaSidebarItemContent>
      <VaSidebarItemTitle>
        Warning active color (active)
      </VaSidebarItemTitle>
    </VaSidebarItemContent>
  </VaSidebarItem>
</template>
