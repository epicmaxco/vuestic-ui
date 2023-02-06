<template>
  <story title="va-button/icons-as-slots-in-config">
    <va-config :components="{ VaIcon: { color: '#f00' } }">
      <va-button color="danger">
        <va-icon name="gavel" color="textInverted" />
        Colored icons
        <va-icon name="shield" color="textInverted" />
      </va-button>
      <va-button preset="plain" color="warning">
        <va-icon name="gavel" color="warning" />
        Colored icons
        <va-icon name="shield" color="warning" />
      </va-button>
    </va-config>
  </story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
import { VaConfig } from '../../va-config/index'
import { VaIcon } from '../../va-icon/index'
</script>
