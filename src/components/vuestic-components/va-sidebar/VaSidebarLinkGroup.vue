<template>
  <li :class="computedClass">
    <div
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
      @click.stop.prevent="toggleMenuItem()"
      :style="sidebarLinkStyles"
      v-if="!minimized"
      :class="computedLinkClass">
      <div class="va-sidebar-link__content">
        <va-icon
          v-if="icon"
          class="va-sidebar-link__content__icon"
          :style="computedIconStyle"
          :name="icon"
        />
        <span class="va-sidebar-link__content__title">
          <slot name="title">
            {{title}}
          </slot>
        </span>
        <va-icon
          class="va-sidebar-link-group__dropdown-icon"
          :style="computedIconStyle"
          :name="`fa fa-angle-${expanded ? 'up' : 'down'}`"/>
      </div>
    </div>
    <transition-expand v-if="!minimized">
      <ul
        class="va-sidebar-link-group__submenu in"
        v-show="expanded"
        ref="linkGroupWrapper"
      >
        <slot/>
      </ul>
    </transition-expand>
    <va-dropdown
      v-if="minimized"
      position="right"
      fixed
      :preventOverflow="false"
    >
      <div
        slot="anchor"
        @mouseenter="updateHoverState"
        @mouseleave="updateHoverState"
        :style="sidebarLinkStyles"
        class="va-sidebar-link"
        :class="computedLinkClass"
      >
        <div class="va-sidebar-link__content">
          <va-icon
            v-if="icon"
            class="va-sidebar-link__content__icon"
            :style="computedIconStyle"
            :name="icon"
          />
        </div>
        <va-icon
          name="material-icons"
          class="va-sidebar-link__after"
          :style="computedIconStyle"
        >
          more_horiz
        </va-icon>
      </div>
      <ul
        class="va-sidebar-link-group__submenu in"
        :style="{backgroundColor: $themes[color]}"
      >
        <slot/>
      </ul>
    </va-dropdown>
  </li>
</template>

<script>
import VaIcon from '../va-icon/VaIcon'
import VaDropdown from '../va-dropdown/VaDropdown'
import { hex2hsl } from '../../../services/color-functions'
import TransitionExpand from './TransitionExpand'

export default {
  name: 'va-sidebar-link-group',
  inject: ['contextConfig'],
  props: {
    icon: [String, Array],
    title: String,
    minimized: Boolean,
    activeByDefault: Boolean,
    children: Array,
    color: {
      type: String,
      default: 'secondary',
    },
  },
  components: {
    TransitionExpand,
    VaIcon,
    VaDropdown,
  },
  data () {
    return {
      isActive: this.activeByDefault,
      isHovered: false,
      expanded: this.expanded,
      dropdownOpened: false,
    }
  },
  mounted () {
    this.updateActiveState()
  },
  watch: {
    $route () {
      this.$nextTick(() => {
        this.updateActiveState()
      })
    },
    minimized (value) {
      if (!value) {
        this.isActive = false
      } else {
        this.updateActiveState()
      }
    },
  },
  methods: {
    toggleMenuItem () {
      this.expanded = !this.expanded
    },
    updateHoverState () {
      this.isHovered = !this.isHovered
    },
    updateActiveState () {
      const active = this.children && this.children.some(item => item.name === this.$route.name)

      this.isActive = this.minimized ? active : false
      this.expanded = active
    },
  },
  computed: {
    computedLinkClass () {
      return {
        'va-sidebar-link': true,
        'va-sidebar-link--expanded': this.expanded,
        'va-sidebar-link--active': this.isActive,
      }
    },
    computedClass () {
      return {
        'va-sidebar-link-group': true,
        'va-sidebar-link-group--minimized': this.minimized,
      }
    },
    sidebarLinkStyles () {
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
        color: this.contextConfig.invertedColor ? this.$themes.primary : 'white',
      }
    },
  },
}

</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-sidebar-link-group {
  flex-direction: column;

  &__submenu {
    list-style: none;
    padding-left: 0;
    width: 100%;
    overflow: hidden;

    a {
      font-size: 0.875rem;
      display: block;
      padding-left: 2.75rem;
    }
  }

  .va-sidebar-link__content {
    width: 100%;
    position: relative;
    padding-right: 2rem;
    display: flex;
    align-items: center;
  }

  &__expanded-icon {
    width: 1.5rem;
    text-align: center;
  }

  &__dropdown-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: .1rem;
    width: 1.5rem;
    height: 1.5rem;
    font-weight: $font-weight-bold;
    line-height: 1.5rem;
  }

  &--minimized {
    .va-dropdown{
      &__anchor {
        width: 100%;
      }
    }
    .va-sidebar-link-group__submenu {
      width: 10rem;
      border-radius: .375rem;
      margin-left: 1px;
      max-height: 80vh;
      padding: .375rem 0;
      overflow-y: auto;
      overflow-x: hidden;

      a {
        padding: .75rem 1rem;
        border-left: none;
        height: auto;
        min-height: 3rem;
      }
    }
    .va-sidebar-link__after {
      position: absolute;
      bottom: .4375rem;
      left: 0;
      right: 0;
      height: .1835rem;
      width: 1.8rem;
      display: block;
      margin: 0 auto;
      line-height: .1835rem;
    }
  }
}
</style>
