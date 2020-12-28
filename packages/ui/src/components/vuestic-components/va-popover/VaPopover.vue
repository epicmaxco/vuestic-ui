<template>
  <va-dropdown
    class="va-popover"
    :position="placement"
    :disabled="disabled"
    :trigger="trigger"
    :hoverOverTimeout="hoverOverTimeout"
    :hoverOutTimeout="hoverOutTimeout"
    :close-on-click-outside="autoHide"
    :opened="opened"
  >
    <template #default>
      <div class="va-popover__content-wrapper">
        <div
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
      </div>
    </template>
    <template #anchor>
      <slot />
    </template>
  </va-dropdown>
</template>

<script lang="ts">
import { Prop, Mixins } from 'vue-property-decorator'
import { Options } from 'vue-class-component'
import {
  getBoxShadowColor,
  getHoverColor,
} from '../../../services/color-functions'
import VaIcon from '../va-icon/VaIcon.vue'
import VaDropdown from '../va-dropdown/VaDropdown.vue'
import { Placement } from '@popperjs/core'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

@Options({
  name: 'VaPopover',
  components: { VaIcon, VaDropdown },
})
export default class VaPopover extends Mixins(ColorThemeMixin) {
  @Prop({ type: String, default: 'success' }) color!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) message!: string
  @Prop({ type: String, default: 'hover' }) trigger!: string
  @Prop({ type: Boolean, default: false }) opened!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: 'bottom' }) placement!: Placement
  @Prop({ type: Boolean, default: true }) autoHide!: boolean
  @Prop({ type: Number, default: 0 }) hoverOverTimeout!: boolean
  @Prop({ type: Number, default: 0 }) hoverOutTimeout!: boolean

  get computedPopoverStyle () {
    return {
      boxShadow: '0px 2px 3px 0 ' + getBoxShadowColor((this as any).$themes[this.color]),
      backgroundColor: getHoverColor((this as any).$themes[this.color]),
    }
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-popover {
  display: inline-block;

  &__content-wrapper {
    background-color: white;
    border-radius: 0.5rem;
  }

  &__content {
    opacity: 1;
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
