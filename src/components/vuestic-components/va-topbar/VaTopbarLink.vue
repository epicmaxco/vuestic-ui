<template>
  <li>
    <router-link
      tag="a"
      :class="computedLinkClass"
      @mouseenter.native="updateHoverState(true)"
      @mouseleave.native="updateHoverState(false)"
      :style="computedLinkStyles"
      active-class="va-topbar-link--active"
      :to="to"
      :target="target"
    >
      <va-icon
        v-if="icon"
        class="va-topbar-link__content__icon"
        :style="computedIconStyle"
        :name="icon"
      />
      <div class="va-topbar-link__content__title">
        <slot name="title"/>
        {{title}}
      </div>
    </router-link>
  </li>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'va-topbar-link',
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
  mounted () {
    this.setActiveState()
  },
  data () {
    return {
      isHovered: false,
      isActive: this.activeByDefault,
    }
  },
  computed: {
    computedLinkClass () {
      return {
        'va-topbar-link': true,
        'va-topbar-link--minimized': this.minimized,
      }
    },
    computedLinkStyles () {
      let styles = {}

      if (this.isActive) {
        styles.color = `${this.$themes['primary']} !important`
        styles.borderColor = this.$themes['primary']
      } if (this.isHovered) {
        styles.color = `${this.$themes['primary']} !important`
      }

      return styles
    },
    computedIconStyle () {
      return (this.isHovered || this.isActive)
        ? {
          color: this.$themes['primary'],
        }
        : {
          color: 'white',
        }
    },
  },
  watch: {
    $route () {
      this.setActiveState()
    },
  },
  methods: {
    updateHoverState (isHovered) {
      this.isHovered = isHovered
    },
    setActiveState () {
      this.$nextTick(() => {
        this.isActive = this.$el.querySelector('a').classList.contains('va-topbar-link--active')
        if (!this.isActive) {
          return
        }
        const linkGroup = this.$parent && this.$parent.$parent
        if (linkGroup.$options.name === 'topbar-link-group') {
          linkGroup.expanded = true
          linkGroup.isActive = this.minimized
        }
      })
    },
  },
}
</script>

<style lang="scss">
.va-topbar-link {
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

  padding: 1rem 0;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 4rem;
  border-bottom: .25rem solid transparent;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.65);

  @at-root .va-topbar-link-group__submenu & { // inside dropdown
    margin-left: 0px;
    padding: 0.5rem 1rem;
    position: relative;
    display: inline-block;
    min-width: 150px;
    min-height: initial;
    border: none;
    word-break: break-word;
    color: $vue-darkest-blue !important;
    background-color: initial !important;

    .va-topbar-link__content__title {
      display: inline-block !important;
    }
  }

  &__content {
    &__icon {
      margin-right: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $sidebar-menu-item-icon-size;
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
  }
}

</style>
