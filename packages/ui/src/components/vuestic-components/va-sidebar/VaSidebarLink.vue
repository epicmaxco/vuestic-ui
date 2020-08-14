<template>
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
      :style="computedIconStyles"
      :name="icon"
    />
    <div class="va-sidebar-link__content__title va-sidebar-link__content__title--no-nested">
      <slot name="title" />
      {{ title }}
    </div>
  </router-link>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { shiftHslColor } from '../../../services/color-functions'
import VaIcon from '../va-icon/VaIcon.vue'
import { Mixins, Prop, Component, Watch } from 'vue-property-decorator'

@Component({ components: { VaIcon } })
export default class VaSidebarLink extends Mixins(ColorThemeMixin) {
 @Prop({
   type: [Object, String],
   default: '',
 }) readonly to!: Record<string, any> | string

 @Prop({
   type: String,
   default: '_self',
 }) readonly target!: string

 @Prop({
   type: String,
   default: '',
 }) readonly icon!: string

 @Prop({
   type: String,
   default: '',
 }) readonly title!: string

@Prop({
  type: String,
  default: '',
}) readonly color!: string

 @Prop({
   type: Boolean,
 }) readonly minimized!: boolean

 @Prop({
   type: Boolean,
 }) readonly activeByDefault!: boolean

 @Prop({
   type: String,
   default: '#323742',
 }) readonly textColor!: string

 @Prop({
   type: Boolean,
 }) readonly noHighlight!: boolean

  isHovered = false
  isActive = this.activeByDefault

  @Watch('$route')
  onRouteChange () {
    this.updateActiveState()
  }

  get computedLinkClass () {
    return {
      'va-sidebar-link': true,
      'va-sidebar-link--minimized': this.minimized,
    }
  }

  get computedLinkStyles () {
    return {
      color: this.isHovered || this.isActive ? (this as any).$themes.primary : this.textColor,
      backgroundColor: this.isHovered || (!this.noHighlight && this.isActive) ? shiftHslColor((this as any).$themes.secondary, { s: 13, l: -3 }) : this.color,
      borderColor: this.isActive && !this.noHighlight ? (this as any).$themes.primary : 'transparent',
    }
  }

  get computedIconStyles () {
    return (this.isHovered || this.isActive)
      ? { color: (this as any).$themes.primary }
      : { color: 'white' }
  }

  updateHoverState (isHovered: boolean) {
    this.isHovered = isHovered
  }

  updateActiveState () {
    this.$nextTick(() => {
      const name = typeof this.to === 'string' ? this.to : this.to.name
      this.isActive = (this as any).$router.resolve(name).route.name === (this as any).$route.name
    })
  }

  mounted () {
    this.updateActiveState()
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

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

  &__content {
    &__icon {
      width: 1.5rem;
      min-width: 1.5rem;
      text-align: center;
      font-size: $sidebar-menu-item-icon-size;
      margin: 0 0.4rem;
    }

    &__title &__title--no-nested {
      font-weight: normal;
      line-height: 1.25rem;
      font-size: 1rem;
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
