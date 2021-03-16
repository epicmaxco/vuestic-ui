<template>
  <div :class="computedClass">
    <va-dropdown
      v-if="!split"
      :disabled="disabled"
      :position="position"
      @update:modelValue="toggleDropdown"
    >
      <template #anchor>
        <va-button
          :size="size"
          :flat="flat"
          :outline="outline"
          :disabled="disabled"
          :color="color"
          :icon-right="computedIcon"
          @click="click"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </va-button>
      </template>

      <div class="va-button-dropdown__content">
        <slot />
      </div>
    </va-dropdown>
    <va-button-group v-else>
      <va-button
        :size="size"
        :flat="flat"
        :outline="outline"
        :disabled="disabled || disableButton"
        :color="color"
        :to="splitTo"
        @click="mainButtonClick"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </va-button>
      <va-dropdown
        :disabled="disabled || disableDropdown"
        :position="position"
        @update:modelValue="toggleDropdown"
      >
      <template #anchor>
        <va-button
          :size="size"
          :flat="flat"
          :outline="outline"
          :disabled="disabled || disableDropdown"
          :color="color"
          :icon="computedIcon"
          @click="click"
        />
      </template>
        <div class="va-button-dropdown__content">
          <slot />
        </div>
      </va-dropdown>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'

import VaDropdown from '../va-dropdown'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'

class ButtonDropdownProps {
  modelValue = prop<boolean>({ type: Boolean })
  outline = prop<boolean>({ type: Boolean, default: false })
  disableButton = prop<boolean>({ type: Boolean, default: false })
  disableDropdown = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  })

  split = prop<boolean>({ type: Boolean })
  splitTo = prop<string>({ type: String, default: '' })
  icon = prop<string>({ type: String, default: 'expand_more' })
  openedIcon = prop<string>({ type: String, default: 'expand_less' })
  position = prop<string>({ type: String, default: 'bottom' })
  label = prop<string>({ type: String })
}

const ButtonDropdownPropsMixin = Vue.with(ButtonDropdownProps)

@Options({
  name: 'VaButtonDropdown',
  components: { VaButtonGroup, VaButton, VaDropdown },
  emits: ['click', 'main-button-click'],
})
export default class VaButtonDropdown extends mixins(
  SizeMixin,
  ColorMixin,
  ButtonDropdownPropsMixin,
) {
  showDropdown = false

  get computedIcon (): string {
    // @ts-ignore
    return this.showDropdown ? this.$props.openedIcon : this.$props.icon
  }

  get computedClass () {
    return {
      'va-button-dropdown': true,
      'va-button-dropdown--split': this.split,
      'va-button-dropdown--normal': this.size === 'normal',
      'va-button-dropdown--large': this.size === 'large',
      'va-button-dropdown--small': this.size === 'small',
    }
  }

  click (event: Event): void {
    this.$emit('click', event)
  }

  mainButtonClick (event: Event): void {
    this.$emit('main-button-click', event)
  }

  toggleDropdown (value: boolean): void {
    this.showDropdown = value
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-button-dropdown {
  .va-button {
    margin: 0;
  }

  &--split {
    .va-dropdown {
      .va-dropdown__anchor {
        margin: 0;
      }

      .va-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 1.5rem;
      }
    }

    &.va-button-dropdown--small {
      .va-dropdown .va-button {
        font-size: 1.6rem;
      }
    }

    &.va-button-dropdown--large {
      .va-dropdown .va-button {
        font-size: 1.7rem;
      }
    }
  }

  &__content {
    background: $dropdown-background;
    box-shadow: $dropdown-box-shadow;
    padding: $dropdown-padding;
    border-radius: $dropdown-border-radius;
  }
}
</style>
