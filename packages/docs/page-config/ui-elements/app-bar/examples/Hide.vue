<template>
  <div
    class="relative max-h-32 border border-solid border-black overflow-hidden flex flex-col"
  >
    <va-app-bar
      absolute
      hide-on-scroll
      target="#va-app-bar-hide"
    >
      <va-button
        icon="home"
        color="#fff"
        preset="plain"
      />
      <va-button
        icon="info"
        color="#fff"
        preset="plain"
      />
      <va-button
        icon="battery"
        color="#fff"
        preset="plain"
      />
      <va-spacer />
      <va-button
        color="#fff"
        preset="plain"
      >
        Login
      </va-button>
      <va-button-dropdown
        preset="plain"
        icon-color="#fff"
      >
        Content
      </va-button-dropdown>
    </va-app-bar>

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
