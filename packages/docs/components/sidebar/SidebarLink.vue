<template>
  <va-list-item
    :to="path"
    class="sidebar__link"
    :style="computedStyle"
    active-class="text--primary"
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
import { getHoverColor } from './../../../ui/src/services/color-functions'
import { getColor } from './../../../ui/src/services/ColorThemePlugin'

@Component({})
export default class SidebarLink extends Vue {
  isHovered = false

  @Prop({ type: String }) path!: string

  get computedStyle () {
    return {
      backgroundColor: this.isHovered ? getHoverColor(getColor(this, 'primary', '#ECF4F8')) : '',
      color: this.isHovered ? getColor(this, 'primary', '#2C82E0') : '',
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../ui/src/components/vuestic-sass/resources/resources.scss";

  .sidebar__link {
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
