<template>
  <div class="wrapper">
    <va-app-bar
      shadow-on-scroll
      color="backgroundElement"
      shadow-color="danger"
      target="#va-app-bar-shadow"
    >
      <va-button icon="home" color="textLight" preset="plain" />
      <va-button icon="info" color="textLight" preset="plain" />
      <va-button icon="battery" color="textLight" preset="plain" />
      <va-spacer />
      <va-button color="textLight" preset="plain">Login</va-button>
      <va-button-dropdown size="small" preset="plain" color="textLight" icon="ellipsis" stick-to-edges>
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
