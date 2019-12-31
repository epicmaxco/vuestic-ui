<template>
  <li>
    <router-link
      :class="computedLinkClass"
      @mouseenter.native="updateHoverState(true)"
      @mouseleave.native="updateHoverState(false)"
      :style="computedLinkStyles"
      active-class="va-sidebar-link--active"
      :to="to"
      :target="target"
    >
      <va-icon
        v-if="icon"
        class="va-sidebar-link__content__icon"
        :style="computedIconStyle"
        :name="icon"
      />
      <div class="va-sidebar-link__content__title">
        <slot name="title"/>
        {{title}}
      </div>
    </router-link>
  </li>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { hex2hsl } from '../../../services/color-functions'
import VaIcon from '../va-icon/VaIcon'

export default {
  name: 'va-sidebar-link',
  components: { VaIcon },
  inject: ['contextConfig'],
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
      type: [String, Array],
    },
    title: {
      type: String,
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
    $route (route) {
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
      let getBackgroundColor = () => {
        let color = hex2hsl(this.$themes.secondary)

        color.s -= 13
        color.l += 15

        if (color.s < 0) color.s = 0
        if (color.l > 100) color.l = 100

        return color.css
      }

      if (this.isHovered || this.isActive) {
        return {
          color: this.contextConfig.invertedColor ? 'white' : this.$themes.primary,
          backgroundColor: this.contextConfig.invertedColor ? this.$themes.primary : getBackgroundColor(),
          borderColor: this.isActive ? this.$themes.primary : 'transparent',
        }
      }

      return {
        // Not sure if using invertedColor is correct here.
        color: this.contextConfig.invertedColor ? this.$themes.secondary : 'rgba(255, 255, 255, 0.65)',
      }
    },
    computedIconStyle () {
      if (this.isHovered || this.isActive) {
        return {
          color: this.contextConfig.invertedColor ? 'white' : this.$themes.primary,
        }
      }
      return {
        color: this.contextConfig.invertedColor ? this.$themes.secondary : 'white',
      }
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
@import "../../vuestic-sass/resources/resources";

.va-sidebar-link {
  position: relative;
  min-height: 3rem;
  cursor: pointer;
  padding-left: .75rem;
  padding-top: .75rem;
  padding-bottom: .75rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-left: .25rem solid transparent;
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
