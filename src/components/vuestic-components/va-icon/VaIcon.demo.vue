<template>
  <VbDemo>
    <VbCard title="MD">
      <va-icon class="material-icons">
        home
      </va-icon>
      <va-icon name="home" />
    </VbCard>
    <VbCard title="FA 4">
      <va-icon class="fa fa-home" />
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
      <div>
        <va-icon
          name="home"
          size="small"
        />
        <va-icon
          name="home"
        />
        <va-icon
          name="home"
          size="large"
        />
      </div>
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
    <VbCard title="Themes and color">
      <va-icon
        name="home"
        color="primary"
      />
      <va-icon
        name="home"
        color="secondary"
      />
      <va-icon
        name="home"
        color="danger"
      />
      <va-icon
        name="home"
        color="warning"
      />
      <va-icon
        name="home"
        color="pink"
      />
    </VbCard>
    <VbCard title="Rotation">
      <va-icon
        name="home"
        rotation="0"
      />
      <va-icon
        name="home"
        rotation="15"
      />
      <va-icon
        name="home"
        rotation="30"
      />
      <va-icon
        name="home"
        rotation="60"
      />
      <va-icon
        name="home"
        rotation="120"
      />
      <va-icon
        name="home"
        rotation="240"
      />
    </VbCard>
    <VbCard title="Custom tag">
      <va-icon
        tag="span"
        name="home"
      />
      <va-icon
        tag="div"
        name="home"
      />
      <va-icon
        tag="pre"
        name="home"
      />
      <va-icon
        tag="a"
        name="home"
      />
    </VbCard>
    <VbCard title="Added icon">
      <va-icon
        name="info"
      />
    </VbCard>
    <VbCard title="Override font">
      <va-icon
        name="info"
        font="md"
      />
    </VbCard>
    <VbCard title="Click">
      <va-icon
        name="info"
        font="md"
        @click="clickedCount += 1"
      />
      {{ clickedCount }}
    </VbCard>
    <VbCard title="Svg component">
      <va-icon :tag="SvgComponent" />
    </VbCard>
    <VbCard title="Spin">
      <va-icon name="sync-spin" />
      <va-icon
        name="sync"
        class="fa-spin"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaIcon from './VaIcon'
import SvgComponent from './va-iconset/VaIconVue'

export default {
  components: {
    VaIcon,
  },
  data () {
    return {
      clickedCount: 0,
      SvgComponent,
    }
  },
}
</script>

<style scoped>
.va-icon + .va-icon {
  margin-left: 5px;
}
</style>
