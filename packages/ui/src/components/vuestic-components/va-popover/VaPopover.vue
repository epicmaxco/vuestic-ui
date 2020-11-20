<template>
  <v-popover
    :trigger="trigger"
    :open="open"
    :disabled="disabled"
    :placement="placement"
    :auto-hide="autoHide"
    popover-class="va-popover"
    popover-inner-class="va-popover__inner"
    popover-wrapper-class="va-popover__wrap"
  >
    <slot />
    <div
      slot="popover"
      class="va-popover__content"
      :style="computedPopoverStyle"
    >
      <div
        v-if="icon"
        class="va-popover__icon"
      >
        <va-icon
          :name="icon"
          :color="color"
        />
      </div>
      <div v-if="title || message">
        <div
          v-if="title"
          class="va-popover__title"
        >
          {{ title }}
        </div>
        <div class="va-popover__text">
          {{ message }}
        </div>
      </div>
    </div>
  </v-popover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { VPopover } from 'v-tooltip'

import VaIcon from '../va-icon'

import {
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-functions'
import { useTheme } from '../../../services/Theme'

@Component({
  name: 'VaPopover',
  components: {
    VPopover,
    VaIcon,
  },
})
export default class VaPopover extends Vue {
  @Prop({
    type: String,
    default: 'success',
  }) color!: string

  @Prop({
    type: String,
    default: '',
  }) icon!: string

  @Prop({
    type: String,
    default: '',
  }) title!: string

  @Prop({
    type: String,
    default: '',
  }) message!: string

  @Prop({
    type: String,
    default: 'hover',
  }) trigger!: string

  @Prop({
    type: Boolean,
    default: false,
  }) open!: string

  @Prop({
    type: Boolean,
    default: false,
  }) disabled!: string

  @Prop({
    type: String,
    default: 'bottom',
  }) placement!: string

  @Prop({
    type: Boolean,
    default: true,
  }) autoHide!: string

  get theme () {
    // @ts-ignore
    const { getTheme } = useTheme()
    return getTheme() || {}
  }

  get computedPopoverStyle () {
    return {
      boxShadow: '0px 2px 3px 0 ' + getBoxShadowColor(this.theme[this.color]),
      backgroundColor: getHoverColor(this.theme[this.color]),
    }
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.v-popover {
  display: inline;
}

.va-popover {
  opacity: 1;
  border: none;
  border-radius: 0.5rem;
  background-color: white;

  &__content {
    display: flex;
    align-items: center;
    padding: 0.65rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  &__icon + div {
    padding-left: 0.75rem;
    width: 100%;
    overflow: hidden;
  }

  &__title {
    font-weight: $font-weight-bold;
    margin-bottom: 0.125rem;
  }

  &__text {
    line-height: 1.5;
  }
}
</style>
