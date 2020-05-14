<template>
  <a
    :class="computedLinkClass"
    :style="computedLinkStyles"
    active-class="va-sidebar-link--active"
    :href="route"
    :target="target"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
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
  </a>
</template>

<script>
import Vue from 'vue'
import { ColorThemeMixin } from '../../../../ui/src/services/ColorThemePlugin'
import { shiftHslColor } from '../../../../ui/src/services/color-functions'
import VaIcon from '../../../../ui/src/components/vuestic-components/va-icon/VaIcon'

export default Vue.extend({
  name: 'VaSidebarLink',
  components: { VaIcon },
  mixins: [ColorThemeMixin],
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
  computed: {
    route () {
      return `/${this.$root.$i18n.locale}/${this.to}`
    },
    computedLinkClass () {
      return {
        'va-sidebar-link': true,
        'va-sidebar-link--minimized': this.minimized,
      }
    },
    computedLinkStyles () {
      if (this.isHovered || this.isActive) {
        return {
          fontWeight: 'bold',
          color: this.$themes.primary,
          backgroundColor: shiftHslColor(this.$themes.secondary, { s: 13, l: -3 }),
          borderColor: this.isActive ? this.$themes.primary : 'transparent',
        }
      } else {
        return {
          fontWeight: 'normal',
          color: '#34495e',
        }
      }// else <- controlled by CSS (color in rgba)
    },
    computedIconStyles () {
      return (this.isHovered || this.isActive)
        ? { color: this.$themes.primary }
        : { color: '#34495e' }
    },
  },
  watch: {
    $route () {
      this.updateActiveState()
    },
  },
  mounted () {
    this.updateActiveState()
  },
  methods: {
    updateHoverState (isHovered) {
      this.isHovered = isHovered
    },
    updateActiveState () {
      this.$nextTick(() => {
        this.isActive = this.$route && this.$route.name === this.to.name
      })
    },
  },
})
</script>

<style lang="scss">
@import "../../../../ui/src/components/vuestic-sass/resources/resources";

.va-sidebar-link {
  position: relative;
  min-height: 3rem;
  cursor: pointer;
  padding: 0.75rem;
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
