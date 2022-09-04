<template>
  <div class="wrapper">
    <va-app-bar
      absolute
      hide-on-scroll
      target="#va-app-bar-hide"
    >
      <va-button icon="home" color="#fff" preset="plain" />
      <va-button icon="info" color="#fff" preset="plain" />
      <va-button icon="battery" color="#fff" preset="plain" />
      <va-spacer />
      <va-button color="#fff" preset="plain">Login</va-button>
      <va-button-dropdown size="small" preset="plain" icon="ellipsis">
        Content
      </va-button-dropdown>
    </va-app-bar>

    <div id="va-app-bar-hide">.</div>
  </div>
</template>

<style scope>
  .wrapper {
    position: relative;
    max-height: 120px;
    border: 1px solid black;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #va-app-bar-hide {
    background: var(--va-background-primary);
    padding-bottom: 500px;
    overflow: auto;
  }
</style>
