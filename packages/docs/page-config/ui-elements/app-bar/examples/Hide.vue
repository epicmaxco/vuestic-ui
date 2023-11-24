<template>
  <div
    class="relative max-h-32 border border-solid border-black overflow-hidden flex flex-col"
  >
    <VaAppBar
      absolute
      hide-on-scroll
      target="#va-app-bar-hide"
    >
      <VaButton
        icon="home"
        color="#fff"
        preset="plain"
      />
      <VaButton
        icon="info"
        color="#fff"
        preset="plain"
      />
      <VaButton
        icon="battery"
        color="#fff"
        preset="plain"
      />
      <VaSpacer />
      <VaButton
        color="#fff"
        preset="plain"
      >
        Login
      </VaButton>
      <VaButtonDropdown
        preset="plain"
        icon-color="#fff"
      >
        Content
      </VaButtonDropdown>
    </VaAppBar>

    <div id="va-app-bar-hide">
      .
    </div>
  </div>
</template>

<style scope>
#va-app-bar-hide {
  background: var(--va-background-primary);
  padding-bottom: 500px;
  overflow: auto;
}
</style>
