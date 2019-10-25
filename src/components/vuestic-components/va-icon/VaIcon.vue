<template>
  <!-- HACK Supports only material icons for now! -->
  <i class="va-icon"
     :class="[name, iconClass, 'material-icons']"
     :style="iconStyle"
  >
    <slot>
      {{ name }}
    </slot>
  </i>
</template>

<script>
export default {
  name: 'va-icon',
  props: {
    name: {
      type: [String, Array],
      validator: name => {
        if (name.match(/ion-|iconicstroke-|glyphicon-|maki-|entypo-|fa-|brandico-/)) {
          console.error(`${name} icon is not available. Please replace to material-icon`)
        }

        return name
      },
    },
    size: {
      type: [String, Number],
      default: 'medium',
      validator: value => {
        return value.toString().match(/rem|em|ex|pt|pc|mm|cm|px/) || ['medium', 'small', 'large'].includes(value) || typeof value === 'number'
      },
    },
    fixedWidth: {
      type: Boolean,
    },
    rotation: {
      type: [String, Number],
    },
    color: {
      type: String,
    },
  },
  computed: {
    iconClass () {
      return {
        'va-icon--large': this.size === 'large',
        'va-icon--small': this.size === 'small',
        'va-icon--fixed': this.fixedWidth,
      }
    },
    iconStyle () {
      return {
        transform: 'rotate(' + this.rotation + 'deg)',
        fontSize: typeof this.size === 'number' ? this.size + 'px' : this.size,
        color: this.$themes ? this.$themes[this.color] : this.color,
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-icon {
  display: inline-block;
  letter-spacing: normal;
  font-size: initial;

  &--large {
    font-size: $icon-lg-size;
  }

  &--small {
    font-size: $icon-sm-size;
  }

  &--fixed {
    width: $icon-fixed-width;
    text-align: center;
  }
}
</style>
