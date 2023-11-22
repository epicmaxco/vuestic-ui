<template>
  <div
    class="relative max-h-32 border border-solid border-black overflow-hidden flex flex-col"
  >
    <VaAppBar
      shadow-on-scroll
      color="primary"
      shadow-color="danger"
      target="#va-app-bar-shadow"
    >
      <VaButton
        icon="home"
        color="textInverted"
        preset="plain"
      />
      <VaButton
        icon="info"
        color="textInverted"
        preset="plain"
      />
      <VaButton
        icon="battery"
        color="textInverted"
        preset="plain"
      />
      <VaSpacer />
      <VaButton
        color="textInverted"
        preset="plain"
      >
        Login
      </VaButton>
      <VaButtonDropdown
        preset="plain"
        color="textInverted"
        icon-color="#fff"
        stick-to-edges
      >
        Content
      </VaButtonDropdown>
    </VaAppBar>

    <div id="va-app-bar-shadow">
      .
    </div>
  </div>
</template>

<style scope>
#va-app-bar-shadow {
  padding-bottom: 500px;
  overflow: auto;
}
</style>
