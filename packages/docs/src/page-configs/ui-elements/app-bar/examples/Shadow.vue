<template>
  <div class="wrapper">
    <va-app-bar
      shadow-on-scroll
      color="background-tertiary"
      shadow-color="danger"
      target="#va-app-bar-shadow"
    >
      <va-button icon="home" color="textInverted" preset="plain" />
      <va-button icon="info" color="textInverted" preset="plain" />
      <va-button icon="battery" color="textInverted" preset="plain" />
      <va-spacer />
      <va-button color="textInverted" preset="plain">Login</va-button>
      <va-button-dropdown size="small" preset="plain" color="textInverted" icon="ellipsis" stick-to-edges>
        Content
      </va-button-dropdown>
    </va-app-bar>

    <div id="va-app-bar-shadow">.</div>
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

  #va-app-bar-shadow {
    padding-bottom: 500px;
    overflow: auto;
  }
</style>
