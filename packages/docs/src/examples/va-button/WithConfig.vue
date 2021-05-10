<template>
  <va-config :components="{ VaIcon: { color: '#ffffff' } }">
    <va-button size="large" class="mr-2" space-between-items>
      <va-icon size="large" name="gavel"/>
      Colored icons
      <va-icon size="large" name="shield"/>
    </va-button>

    <va-button class="mr-2" space-between-items>
      <va-icon name="gavel"/>
      Colored icons
      <va-icon name="shield"/>
    </va-button>

    <va-button size="small" :rounded="false" class="mr-2" space-between-items>
      <va-icon size="small" name="gavel"/>
      Colored icons
      <va-icon size="small" name="shield"/>
    </va-button>
  </va-config>
</template>
