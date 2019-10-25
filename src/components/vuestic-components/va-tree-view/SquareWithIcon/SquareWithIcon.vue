<template>
  <div class="square-with-icon" :style="{ backgroundColor: colorComputed }">
    <va-icon :name="icon"/>
  </div>
</template>

<script>
import VaIcon from '../../va-icon/VaIcon'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

export default {
  name: 'square-with-icon',
  mixins: [ ColorThemeMixin ],
  components: { VaIcon },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.square-with-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background-color: $vue-green;
  border-radius: .25rem;
  width: 1.375rem;
  height: 1.375rem;
}
</style>
