<template>
  <va-list-item
    :to="path"
    class="sidebar__link"
    active-class="sidebar__link--active"
    @mouseenter.native="isHovered = true"
    @mouseleave.native="isHovered = false"
  >
    <va-list-item-section>
      <va-list-item-label>
        <slot></slot>
      </va-list-item-label>
    </va-list-item-section>
  </va-list-item>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
// import { getHoverColor } from './../../../ui/src/services/color-functions'

@Component({})
export default class SidebarLink extends Vue {
  isHovered = false

  @Prop({ type: String }) path!: string
}
</script>

<style lang="scss" scoped>
  @import "../../../ui/src/components/vuestic-sass/resources/resources.scss";

  .sidebar__link {
    padding: 1rem 0 1rem 2rem;
    line-height: 1.1;

    // &:hover {
    //   background: $light-blue;

    //   .va-list-item-label {
    //     color: $theme-blue-dark;
    //   }
    // }

    // &--active {
    //   .va-list-item-label {
    //     color: $theme-blue-dark;
    //   }
    // }
    &--active {
      background-color: #b11b1b;
    }
  }
</style>
