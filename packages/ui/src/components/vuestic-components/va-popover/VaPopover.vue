<template>
  <va-dropdown
    class="va-popover"
    :position="$props.placement"
    :disabled="$props.disabled"
    :trigger="$props.trigger"
    :hoverOverTimeout="$props.hoverOverTimeout"
    :hoverOutTimeout="$props.hoverOutTimeout"
    :close-on-click-outside="$props.autoHide"
    :opened="initiallyOpened"
    @trigger="handleTrigger"
  >
    <template #default>
      <div class="va-popover__content-wrapper">
        <div
          class="va-popover__content"
          :style="computedPopoverStyle"
        >
          <div
            v-if="$props.icon"
            class="va-popover__icon"
          >
            <va-icon
              :name="$props.icon"
              :color="$props.color"
            />
          </div>
          <div v-if="$props.title || $props.message">
            <div
              v-if="$props.title"
              class="va-popover__title"
            >
              {{ $props.title }}
            </div>
            <div class="va-popover__text">
              {{ $props.message }}
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
import { PropType } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'
import { Placement } from '@popperjs/core'

import { getBoxShadowColor, getHoverColor } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import VaIcon from '../va-icon'
import VaDropdown from '../va-dropdown'

class PopoverProps {
  color = prop<string>({ type: String, default: 'success' })
  icon = prop<string>({ type: String, default: '' })
  title = prop<string>({ type: String, default: '' })
  message = prop<string>({ type: String, default: '' })
  trigger = prop<string>({ type: String, default: 'hover' })
  opened = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  placement = prop<Placement>({ type: String as PropType<Placement>, default: 'bottom' })
  autoHide = prop<boolean>({ type: Boolean, default: true })
  hoverOverTimeout = prop<number>({ type: Number, default: 0 })
  hoverOutTimeout = prop<number>({ type: Number, default: 0 })
}

const PopoverPropsMixin = Vue.with(PopoverProps)

@Options({
  name: 'VaPopover',
  components: { VaIcon, VaDropdown },
})
export default class VaPopover extends mixins(
  ColorMixin,
  PopoverPropsMixin,
) {
  private initiallyOpened = this.$props.opened
  private initialHandleTriggerRun = true

  handleTrigger () {
    if (!this.initialHandleTriggerRun) {
      this.initiallyOpened = false
    }

    this.initialHandleTriggerRun = false
  }

  get computedPopoverStyle () {
    return {
      boxShadow: '0px 2px 3px 0 ' + getBoxShadowColor(this.theme.getColor(this.$props.color)),
      backgroundColor: getHoverColor(this.theme.getColor(this.$props.color)),
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
