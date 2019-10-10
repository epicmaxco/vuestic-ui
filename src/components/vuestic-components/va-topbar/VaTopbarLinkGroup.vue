<template>
  <li :class="computedClass">
    <va-dropdown
      position="bottom"
      :preventOverflow="true"
      boundaryBody
      ref="dropdown"
      @input="toggleDropdownState"
    >
      <a
        @click.prevent
        slot="anchor"
        target="_self"
        @mouseenter="updateHoverState"
        @mouseleave="updateHoverState"
        :style="sidebarLinkStyles"
        class="va-topbar-link"
        :class="computedLinkClass"
      >
        <div class="va-topbar-link__content">
          <va-icon
            v-if="icon"
            class="va-topbar-link__content__icon"
            :style="iconStyles"
            :name="icon"
          />
          <span class="va-topbar-link__content__title">
            <slot name="title">
              {{title}}
            </slot>
          </span>
          <va-icon
            class="va-topbar-link-group__expanded-icon"
            :style="iconStyles"
            :name="`fa fa-angle-${dropdownOpened ? 'up' : 'down'}`"
          />
        </div>
      </a>
      <ul class="va-topbar-link-group__submenu in" @click="checkClick">
        <slot/>
      </ul>
    </va-dropdown>
  </li>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-topbar-link-group',
  mixins: [ColorThemeMixin],
  props: {
    icon: [String, Array],
    title: String,
    minimized: Boolean,
    activeByDefault: Boolean,
    color: {
      type: String,
      default: 'secondary',
    },
  },
  mounted () {
    this.setActiveState()
  },
  data () {
    return {
      isActive: this.activeByDefault,
      isHovered: false,
      dropdownOpened: false,
    }
  },
  computed: {
    computedLinkClass () {
      return {
        'va-topbar-link': true,
        'va-topbar-link--active': this.isActive,
      }
    },
    computedClass () {
      return {
        'va-topbar-link-group': true,
        'va-topbar-link-group--minimized': this.minimized,
      }
    },
    sidebarLinkStyles () {
      let styles = {}

      if (this.isActive) {
        styles.color = `${this.$themes['primary']} !important`
        styles.borderColor = this.$themes['primary']
      } if (this.isHovered) {
        styles.color = `${this.$themes['primary']} !important`
      }

      return styles
    },
    iconStyles () {
      return (this.isHovered || this.isActive)
        ? { color: this.$themes['primary'] }
        : { color: 'white' }
    },
  },
  watch: {
    $route () {
      this.setActiveState()
    },
    minimized (value) {
      if (!value) {
        this.isActive = false
      }
    },
  },
  methods: {
    toggleDropdownState (value) {
      this.dropdownOpened = value
    },
    updateHoverState () {
      this.isHovered = !this.isHovered
    },
    setActiveState () {
      this.isActive = this.activeByDefault
    },
    checkClick (event) {
      let linkClicked = false

      this.$slots.default.forEach(component => {
        if (event.path.includes(component.elm)) {
          linkClicked = true
        }
      })

      linkClicked && this.$refs.dropdown.hide()
    },
  },
}

</script>

<style lang="scss">
.va-topbar-link-group {
  &:not(:first-child) {
      @include media-breakpoint-up(xs) {
        margin-left: 20px;
      }

      @include media-breakpoint-up(md) {
        margin-left: 10px;
      }

      @include media-breakpoint-up(lg) {
        margin-left: 40px;
      }

      @include media-breakpoint-up(xl) {
        margin-left: 80px;
      }
  }

  &:not(&--minimized) {
    @include media-breakpoint-only(xs) {
      margin-left: 0;
    }
  }

  &__submenu {
    padding: 0.5rem 0;
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: .5rem;
    width: auto;
    max-width: 450px;

    @include media-breakpoint-down(xs) {
      max-width: 300px;
      max-height: 300px;
      overflow-y: auto;
    }
  }

  .va-topbar-link__content {
    width: 100%;
    position: relative;
    padding-right: 2rem;
    display: flex;
    align-items: center;
  }

  &__expanded-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    font-weight: $font-weight-bold;
  }

  .va-topbar-link__content {
    padding-right: 0;
    &__title {
      opacity: 1 !important;
    }
  }

  &--minimized {
    .va-topbar-link__content {
      &__icon {
        margin-right: 0;
      }
      &__title {
        display: none;
      }
    }

    .va-topbar-link-group__expanded-icon {
      display: none;
    }
  }
}
</style>
