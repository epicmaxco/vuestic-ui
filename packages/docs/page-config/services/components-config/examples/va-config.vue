<template>
  <VaConfig
    :components="{
      VaAlert: { color: 'danger', icon: 'warning' },
    }"
  >
    <div>
      <VaAlert>
        This is error alert
      </VaAlert>
      <VaAlert>
        This is error alert
      </VaAlert>

      <VaAlert color="warning">
        This alert can have it's own color
      </VaAlert>
    </div>
  </VaConfig>
</template>

