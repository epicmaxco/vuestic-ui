<template>
  <VbDemo>
    <VbCard title="MD">
      <va-icon class="material-icons">
        home
      </va-icon>
      <va-icon name="home" />
    </VbCard>
    <VbCard title="FA 4">
      <va-icon name="home" />
      <va-icon name="fa4-home" />
    </VbCard>
    <VbCard title="FA 5">
      <va-icon class="fas fa-home" />
      <va-icon name="fas-home" />
    </VbCard>
    <VbCard title="Ionic">
      <va-icon class="icon ion-md-home" />
      <va-icon name="ion-home" />
    </VbCard>
    <VbCard title="Entypo">
      <va-icon class="entypo-home" />
      <va-icon name="entypo-home" />
    </VbCard>
    <VbCard title="Size presets">
      <va-icon
        name="home"
        size="small"
      />
      <va-icon name="home" />
      <va-icon
        name="home"
        size="large"
      />
    </VbCard>
    <VbCard title="Size as number">
      <va-icon
        name="home"
        :size="48"
      />
      <va-icon
        name="home"
        size="3rem"
      />
    </VbCard>
    <VbCard title="Color">
      <va-icon
        name="home"
        color="primary"
      />
      <va-icon
        name="home"
        color="pink"
      />
    </VbCard>
    <VbCard title="Rotation">
      <va-icon
        name="home"
        :rotation="180"
      />
    </VbCard>
    <VbCard title="Tag is span">
      <va-icon
        tag="span"
        name="home"
      />
    </VbCard>
    <VbCard title="Click">
      <va-icon
        name="info"
        @click="$vb.log('click')"
      />
    </VbCard>
    <VbCard title="Svg component">
      <va-icon :component="getSvgComponent()" />
    </VbCard>
    <VbCard title="text icon">
      <va-icon>close</va-icon>
    </VbCard>
    <VbCard title="Spin Prop">
      <va-icon
        spin
        name="loop"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaIcon from './index'
import SvgComponent from './va-iconset/VaIconVue'

export default {
  components: {
    VaIcon,
  },
  data () {
    return {
      clickedCount: 0,
      getSvgComponent: () => SvgComponent,
    }
  },
}
</script>

<style scoped>
.va-icon + .va-icon {
  margin-left: 5px;
}
</style>
