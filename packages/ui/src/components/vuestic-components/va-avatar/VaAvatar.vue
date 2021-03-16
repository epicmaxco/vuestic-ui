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
        :src="computedGravarar"
      >
    </slot>
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'
// @ts-ignore
import gravatar from 'gravatar'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-bar'

class AvatarProps {
  color = prop<string>({ type: String, default: 'info' })
  textColor = prop<string>({ type: String, default: 'white' })
  square = prop<boolean>({ type: Boolean, default: false })
  icon = prop<string>({ type: String, default: '' })
  src = prop<string>({ type: String, default: null })
  fontSize = prop<string>({ type: String, default: '' })
  email = prop<string>({ type: String, default: '' })
}

const AvatarPropsMixin = Vue.with(AvatarProps)

@Options({
  name: 'VaAvatar',
  components: { VaIcon, VaProgressCircle },
})
export default class VaAvatar extends mixins(
  SizeMixin,
  ColorMixin,
  LoadingMixin,
  AvatarPropsMixin,
) {
  get computedGravarar () {
    return gravatar.url(this.email, {
      s: this.sizeComputed,
      d: 'mp',
    })
  }

  get computedStyle () {
    return {
      color: this.theme.getColor(this.textColor, '#ffffff'),
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
