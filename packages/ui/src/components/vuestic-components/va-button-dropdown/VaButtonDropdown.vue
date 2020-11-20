<template>
  <div :class="computedClass">
    <va-dropdown
      v-if="!split"
      :disabled="disabled"
      :position="position"
      @input="toggleDropdown"
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
        @input="toggleDropdown"
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
import { Component, Mixins, Inject, Prop } from 'vue-property-decorator'

import VaDropdown from '../va-dropdown'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaButtonDropdown',
  components: { VaButtonGroup, VaButton, VaDropdown },
})
export default class VaButtonDropdown extends Mixins(
  SizeMixin,
  ColorThemeMixin,
) {
  @Inject({
    default: () => ({}),
  }) readonly va!: any

  showDropdown = false

  @Prop({ type: Boolean, default: false }) value!: boolean
  @Prop({ type: Boolean, default: false }) outline!: boolean
  @Prop({ type: Boolean, default: false }) disableButton!: boolean
  @Prop({ type: Boolean, default: false }) disableDropdown!: boolean
  @Prop({ type: Boolean, default: false }) flat!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
  ) size!: string

  @Prop({ type: Boolean, default: false }) split!: boolean
  @Prop({ type: String, default: '' }) splitTo!: string
  @Prop({ type: String, default: 'expand_more' }) icon!: string
  @Prop({ type: String, default: 'expand_less' }) openedIcon!: string
  @Prop({ type: String, default: 'bottom' }) position!: string
  @Prop({ type: String, default: '' }) label!: string

  get computedIcon (): string {
    const propsData: any = this.$options.propsData
    const resultedIcon = propsData.openedIcon || (propsData.icon ? this.icon : this.openedIcon)
    return this.showDropdown ? resultedIcon : this.icon
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
    this.$emit('mainButtonClick', event)
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
