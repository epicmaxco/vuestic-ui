<template>
  <component
    v-if="valueComputed"
    :is="computedTag"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
    v-on="$listeners"
  >
    <div class="va-tag__content">
      <slot></slot>
      <va-icon
        v-if="c_closeable"
        class="va-tag__close-icon"
        @click="close()"
        name="close"
        size="18px"
      />
    </div>
  </component>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const TagPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: true },
  closeable: { type: Boolean, default: false },
})

@Component({
  name: 'VaTag',
  components: { VaIcon },
})
export default class VaTag extends Mixins(
  StatefulMixin,
  ColorThemeMixin,
  SizeMixin,
  TagPropsMixin,
) {
  get computedTag () {
    if (this.c_tag === 'a') {
      return 'a'
    }
    if (this.c_tag === 'router-link' || this.hasRouterLinkParams) {
      return 'router-link'
    }
    return 'div'
  }

  close () {
    this.valueComputed = false
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tag {
  display: inline-flex;
  background-color: yellowgreen;
  border: 0.125rem solid;
  border-color: yellowgreen;
  border-radius: 1rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;
  margin: 0;
  padding: 0 0.5rem;

  &__content {
    display: flex;
    align-items: center;
  }

  &__icon {
    cursor: pointer;
  }
}
</style>
