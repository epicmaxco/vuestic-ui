<template>
  <div style="position: relative;">
    <va-app-bar>
      <va-button icon="home" color="#fff" flat :round="false" />
      <va-button icon="info" color="#fff" flat :round="false" />
      <va-button icon="battery" color="#fff" flat :round="false" />
      <va-spacer />
      <va-button  color="#fff" flat :round="false">
        Login
      </va-button>
      <va-button-dropdown size="small" icon="ellipsis">
        Content
      </va-button-dropdown>
    </va-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
}
</script>
