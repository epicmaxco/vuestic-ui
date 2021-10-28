<template>
  <va-list-item
    :to="path"
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
import { getHoverColor } from 'vuestic-ui/src/services/color-config/color-functions'
import ColorMixin from '../../../../ui/src/services/color-config/ColorMixin'

class SidebarLinkProps {
  path = prop<string>({ type: String, default: undefined })
}

const SidebarLinkPropsMixin = Vue.with(SidebarLinkProps)

@Options({
  name: 'DocsSidebarLink',
})
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

<style lang="scss" scoped>
@import "../../../../ui/src/styles/resources";

.sidebar__link {
  display: block;
  color: inherit;
  padding: 1rem 0 1rem 2rem;
  line-height: normal;

  .va-list-item-section {
    color: inherit;

    .va-list-item-label {
      color: inherit;
    }
  }
}
</style>
