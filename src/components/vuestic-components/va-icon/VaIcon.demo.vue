<template>
  <VbDemo>
    <VbCard title="Default">
      <va-icon :name="icon"/>
    </VbCard>

    <VbCard title="Size in px">
      <va-icon :name="icon" size="40px"/>
    </VbCard>

    <VbCard title="Size as number">
      <va-icon :name="icon" :size="60"/>
    </VbCard>

    <VbCard title="Size presets">
      <div style="font-size: 24px;">
        <va-icon :name="icon" size="small"/>
        <va-icon :name="icon"/>
        <va-icon :name="icon" size="large"/>
      </div>
    </VbCard>

    <VbCard title="Themes">
      <va-icon :name="icon" color="info"/>
      <va-icon :name="icon" color="warning"/>
      <va-icon :name="icon" color="danger"/>
      <va-icon :name="icon" color="success"/>
      <va-icon :name="icon" color="gray"/>
      <va-icon :name="icon" color="dark"/>
    </VbCard>

    <VbCard title="Rotation">
      <va-icon :name="icon" :rotation="45"/>&nbsp;
      <va-icon :name="icon" :rotation="180"/>&nbsp;
      <va-icon :name="icon" :rotation="270"/>&nbsp;
    </VbCard>

    <VbCard title="Fixed width">
      <va-button :icon="icon" icon-right="power_settings_new">
        Some
      </va-button>
    </VbCard>

    <VbCard title="Material design icons">
      <va-icon name="face" />
      <va-icon name="&#xE87C;" />
      <va-icon color="danger" name="face" />
      <va-icon color="danger" name="delete" />
    </VbCard>

    <VbCard title="Custom tags">
      <va-icon tag="span" name="face" />
      <va-icon tag="div" name="face" />
      <va-icon tag="pre" name="face" />
      <va-icon tag="a" name="face" />
      <va-icon tag="code" name="face" />
    </VbCard>
  </VbDemo>
</template>

<script>

import VaIcon from './VaIcon'
import VaButton from '../va-button/VaButton'

export default {
  components: {
    VaButton,
    VaIcon,
  },
  data () {
    return {
      icon: 'home',
    }
  },
}
</script>
