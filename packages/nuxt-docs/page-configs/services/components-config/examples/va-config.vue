<template>
  <va-alert color="#1B2D2A">
    <va-config
      :components="{
        VaButton: { color: '#414066', outline: true },
        VaIcon: { color: '#605E97' },
      }"
    >
      <div class="alert-content">
        <p>Read this important demo message!</p>
        <va-button icon="hearing"> Ok </va-button>
        <va-button icon="visibility"> I already read it before </va-button>
        <va-button color="danger">
          <va-icon name="close" color="danger" />
          Close
        </va-button>
      </div>
    </va-config>
  </va-alert>
</template>

<style lang="scss" scoped>
.alert-content {
  .va-button {
    margin-right: 0.5rem;
  }
}
</style>
