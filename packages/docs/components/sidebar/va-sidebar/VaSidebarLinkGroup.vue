<template>
  <li :class="computedClass">
    <a
      v-if="!minimized"
      href="#"
      target="_self"
      :style="sidebarLinkStyles"
      :class="computedLinkClass"
      @mouseenter="updateHoverState(true)"
      @mouseleave="updateHoverState(false)"
      @click.stop.prevent="toggleMenuItem()"
    >
      <div class="va-sidebar-link__content">
        <va-icon
          v-if="icon"
          class="va-sidebar-link__content__icon"
          :style="iconStyles"
          :name="icon"
        />
        <span class="va-sidebar-link__content__title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <va-icon
          class="va-sidebar-link-group__dropdown-icon"
          :style="iconStyles"
          :name="`expand_${expanded ? 'less' : 'more'}`"
        />
      </div>
    </a>
    <div v-if="!minimized">
      <div
        v-show="expanded"
        ref="linkGroupWrapper"
        class="va-sidebar-link-group__submenu in"
      >
        <slot />
      </div>
    </div>
    <va-dropdown
      v-if="minimized"
      position="right"
      fixed
      :prevent-overflow="false"
    >
      <a
        slot="anchor"
        href="#"
        target="_self"
        :style="sidebarLinkStyles"
        class="va-sidebar-link"
        :class="computedLinkClass"
        @mouseenter="updateHoverState"
        @mouseleave="updateHoverState"
      >
        <div class="va-sidebar-link__content">
          <va-icon
            v-if="icon"
            class="va-sidebar-link__content__icon"
            :style="iconStyles"
            :name="icon"
          />
        </div>
        <va-icon
          name="more_horiz"
          class="va-sidebar-link__after"
          :style="iconStyles"
        />
      </a>
      <div
        class="va-sidebar-link-group__submenu in"
        :style="{backgroundColor: $themes[color]}"
      >
        <slot />
      </div>
    </va-dropdown>
  </li>
</template>

<script>
import Vue from 'vue'
import VaIcon from '../../../../ui/src/components/vuestic-components/va-icon/VaIcon'
import { shiftHslColor } from '../../../../ui/src/services/color-functions'

export default Vue.extend({
  name: 'VaSidebarLinkGroup',
  components: {
    VaIcon,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    minimized: Boolean,
    activeByDefault: Boolean,
    children: {
      type: Array,
      default () {
        return []
      },
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  data () {
    return {
      isActive: this.activeByDefault,
      isHovered: false,
      expanded: this.expanded,
      dropdownOpened: false,
    }
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
      if (this.isHovered || this.isActive) {
        return {
          color: this.$themes.primary,
          backgroundColor: shiftHslColor(this.$themes?.secondary, { s: 13, l: -3 }),
          borderColor: this.isActive ? this.$themes?.primary : 'transparent',
        }
      } else {
        return {
          color: '#34495e',
        }
      }
    },
    iconStyles () {
      return (this.isHovered || this.isActive)
        ? { color: this.$themes.primary }
        : { color: '#34495e', fontWeight: 'normal' }
    },
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
  mounted () {
    this.updateActiveState()
  },
  methods: {
    toggleMenuItem () {
      this.expanded = !this.expanded
    },
    updateHoverState () {
      this.isHovered = !this.isHovered
    },
    updateActiveState () {
      const active = this.children.some(item => this.$route && item.name === this.$route.name)

      this.isActive = this.minimized ? active : false
      this.expanded = active
    },
  },
})

</script>

<style lang="scss">
@import "../../../../ui/src/components/vuestic-sass/resources/resources";

.va-sidebar-link-group {
  flex-direction: column;
  font-weight: bold;

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
    right: 0.1rem;
    width: 1.5rem;
    height: 1.5rem;
    font-weight: $font-weight-bold;
    line-height: 1.5rem;
  }

  &--minimized {
    .va-dropdown {
      &__anchor {
        width: 100%;
      }
    }

    .va-sidebar-link-group__submenu {
      width: 10rem;
      border-radius: 0.375rem;
      margin-left: 1px;
      max-height: 80vh;
      padding: 0.375rem 0;
      overflow-y: auto;
      overflow-x: hidden;

      a {
        padding: 0.75rem 1rem;
        border-left: none;
        height: auto;
        min-height: 3rem;
      }
    }

    .va-sidebar-link__after {
      position: absolute;
      bottom: 0.4375rem;
      left: 0;
      right: 0;
      height: 0.1835rem;
      width: 1.8rem;
      display: block;
      margin: 0 auto;
      line-height: 0.1835rem;
    }
  }
}
</style>
