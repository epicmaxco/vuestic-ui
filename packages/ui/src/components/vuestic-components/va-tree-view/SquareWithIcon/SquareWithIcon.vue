<template>
  <div
    class="square-with-icon"
    :style="{ backgroundColor: colorComputed }"
  >
    <va-icon :name="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue, Prop } from 'vue-property-decorator'

import VaIcon from '../../va-icon/VaIcon.vue'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

@Component({
  name: 'SquareWithIcon',
  components: { VaIcon },
})
export default class SquareWithIcon extends Mixins(
  ColorThemeMixin,
) {
  @Prop({
    type: String,
    default: '',
    required: true,
  }) readonly icon!: string
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
  border-radius: 0.25rem;
  width: 1.375rem;
  height: 1.375rem;
}
</style>
