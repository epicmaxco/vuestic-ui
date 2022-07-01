<template>
  <div style="position: relative; border: 1px solid black; height: 100px;">
    <va-app-bar
      bottom
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
  </div>
</template>
