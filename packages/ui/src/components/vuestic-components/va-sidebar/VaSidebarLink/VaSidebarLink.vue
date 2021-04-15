<template>
  <va-list-item
    :to="to"
    :target="target"
    class="sidebar__link"
    :style="computedStyle"
    active-class="text--primary"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <va-list-item-section>
      <va-list-item-label>
        <slot></slot>
      </va-list-item-label>
    </va-list-item-section>
  </va-list-item>
</template>
<script lang='ts'>
import { Options, Vue, prop, mixins } from 'vue-class-component'
import { getHoverColor } from '../../../../services/color-config/color-functions'
import ColorMixin from '../../../../services/color-config/ColorMixin'

class SidebarLinkProps {
  to = prop<string>({ type: String, default: undefined })
  target = prop<string>({ type: String, default: undefined })
}

const SidebarLinkPropsMixin = Vue.with(SidebarLinkProps)

@Options({})
export default class SidebarLink extends mixins(ColorMixin, SidebarLinkPropsMixin) {
  isHovered = false

  get computedStyle () {
    return {
      backgroundColor: this.isHovered ? getHoverColor(this.computeColor('primary', '#ECF4F8')) : '',
      color: this.isHovered ? this.computeColor('primary', '#2C82E0') : '',
    }
  }
}
</script>

<style lang="scss">
@import "../../../../components/vuestic-sass/resources/resources";

.sidebar__link {
  display: block;
  color: inherit;
  padding: 1rem 0 1rem 2rem;
  line-height: 1.1;

  .va-list-item-section {
    color: inherit;

    .va-list-item-label {
      color: inherit;
    }
  }
}
</style>
