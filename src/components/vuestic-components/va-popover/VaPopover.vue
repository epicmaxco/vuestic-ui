<template>
  <v-popover
    :trigger="trigger"
    :open="open"
    :disabled="disabled"
    :placement="placement"
    :autoHide="autoHide"
    :popoverClass="computedPopoverClasses"
    popoverInnerClass="va-popover__inner"
    popoverWrapperClass="va-popover__wrap"
  >
    <slot />

    <template
      slot="popover"
      >
      <div
        class="va-popover__content"
        :style="computedPopoverContentStyle">

        <slot tag="template" name="popover">
          <div v-if="icon" class="va-popover__icon">
            <i
              :class="icon"
              :style="computedIconStyle"
            />
          </div>
          <div v-if="title || message">
            <div v-if="title" class="va-popover__title">
              {{ title }}
            </div>
            <div class="va-popover__text">
              {{ message }}
            </div>
          </div>
        </slot>
        <!-- <div class="va-popover__triangle"></div> TODO: Fix triangle position with dynamic css using placement prop -->
      </div>
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'
// import {
//   getHoverColor,
//   getBoxShadowColor,
// } from '../../../services/color-functions'

export default {
  name: 'va-popover',
  components: {
    VPopover,
  },
  props: {
    color: {
      type: String,
      default: 'success',
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
    popoverStyles: {
      type: Object,
      required: false,
      default: () => {
        return {
          boxShadow: '0px 2px 3px 0 #414141',
          backgroundColor: '#414141',
          color: 'white',
        }
      },
    },
    popoverClasses: {
      type: Array,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#414141',
    },
  },
  computed: {
    computedPopoverClasses () {
      let classes = ['va-popover']
      if (this.popoverClasses) {
        classes = classes.concat(this.popoverClasses)
      }
      return classes
    },
    computedIconStyle () {
      return {
        fontSize: '1.5rem',
        color: this.$themes[this.color],
      }
    },
    computedPopoverContentStyle () {
      return {
        ...this.popoverStyles,
        backgroundColor: this.backgroundColor,
      }
    },
  },
}
</script>

<style lang="scss">
$evollu-gray-dark: '#d3d3d3';
.v-popover {
  display: inline;
}
.va-popover {
  margin-right: 5px;
  opacity: 1;
  border: none;
  border-radius: 0.5rem;
  background-color: white;

  &__content {
     display: flex;
     align-items: center;
     padding: 0.4rem 0.8rem;
     border-radius: 0.5rem;
     font-size: 1rem;
  }

  &__icon + div{
     padding-left: 0.75rem;
     width: 100%;
     overflow: hidden;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 0.125rem;
  }

  &__text {
    line-height: 1.5;
  }
  // &__triangle {
  //   width: 0;
  //   height: 0;
  //   border-top: 10px solid transparent;
  //   border-bottom: 10px solid transparent;
  //   border-left: 10px solid red;
  //   margin-right: -22px;
  // }
}
</style>
