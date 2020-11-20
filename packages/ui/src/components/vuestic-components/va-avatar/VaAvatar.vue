<template>
  <div
    class="va-avatar"
    ref="avatar"
    :style="computedStyle"
  >
    <slot>
      <va-progress-circle
        v-if="loading"
        indeterminate
        :size="sizeComputed"
        :color="colorComputed"
      />
      <img
        v-else-if="src"
        :src="src"
      >
      <va-icon
        v-else-if="icon"
        :name="icon"
      />
      <img
        v-else-if="email"
        :src="computedGravatar"
      >
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { VaProgressCircle } from '../va-progress-bar'
import VaIcon from '../va-icon'

import * as gravatar from 'gravatar'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'

@Component({
  name: 'VaAvatar',
  components: { VaIcon, VaProgressCircle },
})
export default class VaAvatar extends Mixins(
  SizeMixin,
  ColorThemeMixin,
  LoadingMixin,
) {
  @Prop({ type: String, default: 'info' }) color!: string
  @Prop({ type: String, default: 'white' }) textColor!: string
  @Prop({ type: Boolean, default: false }) square!: boolean
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: null }) src!: string
  @Prop({ type: String, default: '' }) fontSize!: string
  @Prop({ type: String, default: '' }) email!: string

  get computedGravatar () {
    return gravatar.url(this.email, {
      s: this.sizeComputed,
      d: 'mp',
    })
  }

  get computedStyle () {
    return {
      color: (this as any).getColor(this.textColor, '#ffffff'),
      backgroundColor: this.loading || this.email ? 'transparent' : this.colorComputed,
      borderRadius: this.square ? 0 : '50%',
      fontSize: this.fontSize || this.fontSizeComputed,
      width: this.sizeComputed,
      minWidth: this.sizeComputed, // We only define width because common use case would be flex row, for column we expect user to set appropriate styling externally.
      height: this.sizeComputed,
    }
  }
}
</script>

<style lang="scss">
.va-avatar {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;

  img,
  svg {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    margin: auto;
  }
}
</style>
