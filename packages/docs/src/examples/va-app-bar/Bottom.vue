<template>
  <div style="position: relative; border: 1px solid black; height: 100px;">
    <va-app-bar bottom>
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
  </div>
</template>
