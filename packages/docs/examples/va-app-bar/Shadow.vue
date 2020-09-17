<template>
  <div class="wrapper">
    <va-app-bar
      shadow-on-scroll
      target="#shadow"
      color="primary"
    >
      <va-button icon="home" color="#fff" flat :round="false" />
      <va-button icon="info" color="#fff" flat :round="false" />
      <va-button icon="battery" color="#fff" flat :round="false" />
      <va-spacer />
      <va-button  color="#fff" flat :round="false">
        Login
      </va-button>
      <va-button-dropdown size="small" flat color="#fff" icon="ellipsis">
        Content
      </va-button-dropdown>
    </va-app-bar>
    <div id="shadow">.</div>
  </div>
</template>

<style>
  .wrapper {
    position: relative;
    max-height: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #shadow {
    background: #ffffff;
    padding-bottom: 500px;
    overflow: auto;
  }
</style>
