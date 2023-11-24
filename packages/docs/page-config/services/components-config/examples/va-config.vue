<template>
  <VaAlert color="#1B2D2A">
    <VaConfig
      :components="{
        VaButton: { color: '#414066', round: true },
        VaIcon: { color: '#605E97' },
      }"
    >
      <div class="alert-content">
        <p>Read this important demo message!</p>
        <VaButton icon="hearing">
          Ok
        </VaButton>
        <VaButton icon="visibility">
          I already read it before
        </VaButton>
        <VaButton
          color="danger"
          icon="close"
          icon-color="warning"
        >
          Close
        </VaButton>
      </div>
    </VaConfig>
  </VaAlert>
</template>

<style lang="scss" scoped>
.alert-content {
  .va-button {
    margin-right: 0.5rem;
  }
}
</style>
