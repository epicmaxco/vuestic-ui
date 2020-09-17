<template>
  <div style="position: relative; height: 50px;">
    <va-app-bar
      shadow-on-scroll
      target="#shadow"
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
    <div id="#shadow" style="height: 500px;"></div>
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
