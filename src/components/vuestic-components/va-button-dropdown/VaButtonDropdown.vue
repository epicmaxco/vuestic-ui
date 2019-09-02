<template>
  <div :class="computedClass">
    <va-dropdown
      :disabled="disabled"
      :position="position"
      v-if="!split"
      @input="changeVisibility"
    >
      <va-button
        slot="anchor"
        :small="buttonProps.small"
        :large="buttonProps.large"
        :flat="buttonProps.flat"
        :outline="buttonProps.outline"
        :disabled="disabled"
        :color="color"
        :iconRight="computedIcon"
        @click="click"
      >
        <slot name="label">{{label}}</slot>
      </va-button>
      <div class="va-button-dropdown__content">
        <slot/>
      </div>
    </va-dropdown>
    <va-button-group v-else>
      <va-button
        :small="buttonProps.small"
        :large="buttonProps.large"
        :flat="buttonProps.flat"
        :outline="buttonProps.outline"
        :disabled="disabled || disableButton"
        :color="color"
        :to="splitTo"
        @click="mainButtonClick"
      >
        <slot name="label">{{label}}</slot>
      </va-button>
      <va-dropdown
        :disabled="disabled || disableDropdown"
        :position="position"
        @input="changeVisibility"
      >
        <va-button
          :small="buttonProps.small"
          :large="buttonProps.large"
          :flat="buttonProps.flat"
          :outline="buttonProps.outline"
          :disabled="disabled || disableDropdown"
          :color="color"
          :icon="computedIcon"
          slot="anchor"
          @click="click"
        />
        <div class="va-button-dropdown__content">
          <slot/>
        </div>
      </va-dropdown>
    </va-button-group>
  </div>
</template>

<script>
import VaDropdown from '../va-dropdown/VaDropdown'
import VaButton from '../va-button/VaButton'
import VaButtonGroup from '../va-button-group/VaButtonGroup'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-button-dropdown',
  components: { VaButtonGroup, VaButton, VaDropdown },
  mixins: [ColorThemeMixin],
  props: {
    value: {
      type: Boolean,
    },
    buttonProps: {
      type: Object,
      default: () => ({
        small: false,
        large: false,
        flat: false,
        outline: false,
      }),
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    disableButton: {
      type: Boolean,
    },
    disableDropdown: {
      type: Boolean,
    },
    position: {
      type: String,
      default: 'bottom',
    },
    icon: {
      type: String,
      default: 'fa fa-angle-down',
    },
    openedIcon: {
      type: String,
      default: 'fa fa-angle-up',
    },
    split: {
      type: Boolean,
    },
    splitTo: {
      type: String,
    },
  },
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    computedClass () {
      return {
        'va-button-dropdown': true,
        'va-button-dropdown--split': this.split,
        'va-button-dropdown--small': this.buttonProps.small,
        'va-button-dropdown--large': this.buttonProps.large,
      }
    },
    computedIcon () {
      const propsData = this.$options.propsData
      return this.visible ? (propsData.openedIcon || (propsData.icon ? this.icon : this.openedIcon)) : this.icon
    },
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    },
    mainButtonClick (e) {
      this.$emit('mainButtonClick', e)
    },
    changeVisibility (val) {
      this.visible = val
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-button-dropdown {
  .va-dropdown__anchor {
    display: inline-block;
    margin: $btn-margin;
  }
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
