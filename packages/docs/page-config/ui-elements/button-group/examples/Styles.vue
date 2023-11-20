<template>
  <div class="flex flex-wrap gap-6 mb-6">
    <VaButtonGroup>
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>

    <VaButtonGroup preset="primary">
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>

    <VaButtonGroup preset="secondary">
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>
  </div>

  <div class="flex flex-wrap gap-6 mb-6">
    <VaButtonGroup preset="plain">
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>

    <VaButtonGroup preset="plainOpacity">
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>
  </div>

  <div class="flex flex-wrap gap-6 mb-6">
    <VaButtonGroup
      preset="secondary"
      border-color="primary"
    >
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>

    <VaButtonGroup round>
      <VaButton>One</VaButton>
      <VaButton>Two</VaButton>
      <VaButton>Three</VaButton>
    </VaButtonGroup>
  </div>
</template>
