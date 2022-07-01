<template>
  <va-config :components="{ VaIcon: { color: '#ffffff' } }">
    <va-button size="large" class="mr-4 mb-2" space-between-items>
      <va-icon size="large" name="gavel" />
      Colored icons
      <va-icon size="large" name="shield" />
    </va-button>

    <va-button class="mr-4 mb-2" icon="gavel" icon-color="danger" icon-right="shield">
      Colored icons
    </va-button>

    <va-button size="small" class="mr-4 mb-2" icon="gavel" icon-color="danger" icon-right="shield">
      Colored icons
    </va-button>
  </va-config>
</template>
