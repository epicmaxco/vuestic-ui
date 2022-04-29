<template>
  <div class="wrapper">
    <va-app-bar
      shadow-on-scroll
      color="gray"
      shadow-color="danger"
      target="#va-app-bar-shadow"
    >
      <va-button icon="home" color="#fff" flat :rounded="false" />
      <va-button icon="info" color="#fff" flat :rounded="false" />
      <va-button icon="battery" color="#fff" flat :rounded="false" />
      <va-spacer />
      <va-button color="#fff" flat :rounded="false">Login</va-button>
      <va-button-dropdown size="small" flat color="#fff" icon="ellipsis">
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
  background: #ffffff;
  padding-bottom: 500px;
  overflow: auto;
}
</style>
