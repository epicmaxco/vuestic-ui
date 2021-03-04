<template>
  <router-link
    :class="computedLinkClass"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
    :style="computedLinkStyles"
    active-class="va-sidebar-link--active"
    :to="to"
    :target="target"
  >
    <va-icon
      v-if="icon"
      class="va-sidebar-link__content__icon"
      :style="computedIconStyles"
      :name="icon"
    />
    <div class="va-sidebar-link__content__title">
      <slot name="title" />
      {{ title }}
    </div>
  </router-link>
</template>

<script>
import { shiftHslColor } from '../../../../services/color-config/color-functions'
import ColorMixin from '../../../../services/color-config/ColorMixin'
import VaIcon from '../../va-icon'

export default {
  name: 'VaSidebarLink',
  components: { VaIcon },
  mixins: [ColorMixin],
  props: {
    to: {
      type: [Object, String],
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    activeByDefault: {
      type: Boolean,
    },
    minimized: {
      type: Boolean,
    },
  },
  data () {
    return {
      isHovered: false,
      isActive: this.activeByDefault,
    }
  },
  watch: {
    $route () {
      this.updateActiveState()
    },
  },
  computed: {
    computedLinkClass () {
      return {
        'va-sidebar-link': true,
        'va-sidebar-link--minimized': this.minimized,
      }
    },
    computedLinkStyles () {
      if (this.isHovered || this.isActive) {
        return {
          color: this.computeColor('primary'),
          backgroundColor: shiftHslColor(this.computeColor('secondary'), { s: -13, l: 15 }),
          borderColor: this.isActive ? this.computeColor('primary') : 'transparent',
        }
      } else { return {} }// else <- controlled by CSS (color in rgba)
    },
    computedIconStyles () {
      return (this.isHovered || this.isActive)
        ? { color: this.computeColor('primary') }
        : { color: 'white' }
    },
  },
  methods: {
    updateHoverState (isHovered) {
      this.isHovered = isHovered
    },
    updateActiveState () {
      this.$nextTick(() => {
        this.isActive = this.$route.name === this.to.name
      })
    },
  },
  mounted () {
    this.updateActiveState()
  },
}
</script>

<style lang="scss">
@import "src/components/vuestic-sass/resources/resources";

.va-sidebar-link {
  position: relative;
  min-height: 3rem;
  cursor: pointer;
  padding-left: 0.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-left: 0.25rem solid transparent;
  color: rgba(255, 255, 255, 0.65);

  &__content {
    &__icon {
      width: 1.5rem;
      min-width: 1.5rem;
      text-align: center;
      font-size: $sidebar-menu-item-icon-size;
      margin-right: 0.5rem;
    }

    &__title {
      line-height: 1.5em;
    }
  }

  &--minimized {
    .va-sidebar-link__content {
      &__title {
        display: none;
      }
    }
  }
}

</style>
