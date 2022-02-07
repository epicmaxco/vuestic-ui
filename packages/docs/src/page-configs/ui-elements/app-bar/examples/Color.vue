<template>
  <div style="position: relative;">
    <va-app-bar
      color="secondary"
    >
      <va-button icon="home" color="#fff" flat :rounded="false" />
      <va-button icon="info" color="#fff" flat :rounded="false" />
      <va-button icon="battery" color="#fff" flat :rounded="false" />
      <va-spacer />
      <va-button  color="#fff" flat :rounded="false">Login</va-button>
      <va-button-dropdown size="small" flat color="#fff" icon="ellipsis">
        Content
      </va-button-dropdown>
    </va-app-bar>
  </div>

  <div class="mt-2" style="position: relative;">
    <va-app-bar
      color="secondary"
      gradient
    >
      <va-button icon="home" color="#fff" flat :rounded="false" />
      <va-button icon="info" color="#fff" flat :rounded="false" />
      <va-button icon="battery" color="#fff" flat :rounded="false" />
      <va-spacer />
      <va-button  color="#fff" flat :rounded="false">Login</va-button>
      <va-button-dropdown size="small" flat color="#fff" icon="ellipsis">
        Content
      </va-button-dropdown>
    </va-app-bar>
  </div>
</template>
