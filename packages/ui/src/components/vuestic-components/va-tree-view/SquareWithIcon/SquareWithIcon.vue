<template>
  <div
    class="square-with-icon"
    :style="{ backgroundColor: colorComputed }"
  >
    <va-icon :name="icon" />
  </div>
</template>

<script lang="ts">
import VaIcon from '../../va-icon/VaIcon'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'
import { Options, mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  name: 'SquareWithIcon',
  components: { VaIcon },
})
export default class SquareWithIcon extends mixins(ColorThemeMixin) {
  @Prop({ default: '', type: String, required: true }) icon!: String
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
