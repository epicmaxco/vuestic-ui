<template>
  <VaSidebarItem>
    <VaSidebarItemContent>
      <VaSidebarItemTitle> Home </VaSidebarItemTitle>
      <VaIcon name="home" />
    </VaSidebarItemContent>
  </VaSidebarItem>

  <VaSidebarItem active>
    <VaSidebarItemContent>
      <VaSidebarItemTitle> Docs (I'm active) </VaSidebarItemTitle>
      <VaIcon name="article" />
    </VaSidebarItemContent>
  </VaSidebarItem>

  <VaSidebarItem>
    <VaSidebarItemContent>
      <VaIcon name="cake" />
      <VaIcon name="celebration" />
      <VaSidebarItemTitle class="text-center">
        GO TO PARTY!
      </VaSidebarItemTitle>
      <VaIcon name="cake" />
      <VaIcon name="celebration" />
    </VaSidebarItemContent>
  </VaSidebarItem>

  <VaSidebarItem>
    <VaSidebarItemContent>
      <VaSidebarItemTitle> Something cool </VaSidebarItemTitle>
      <VaChip>New!</VaChip>
    </VaSidebarItemContent>
  </VaSidebarItem>
</template>
