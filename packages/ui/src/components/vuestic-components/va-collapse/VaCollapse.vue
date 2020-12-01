<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header"
      @click="changeValue()"
      :tabindex="collapseIndexComputed"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      @focus="onFocus"
      @blur="isKeyboardFocused = false"
    >
      <slot name="header">
        <div class="va-collapse__header__content" :style="contentStyle">
          <va-icon
            v-if="c_icon"
            class="va-collapse__header__icon"
            :name="c_icon"
            :color="c_textColor"
          />
          <div class="va-collapse__header__text">
            {{ c_header }}
          </div>
          <va-icon
            class="va-collapse__header__icon"
            :name="valueProxy ? 'expand_less' : 'expand_more'"
            :color="c_textColor"
          />
        </div>
      </slot>
    </div>
    <div class="va-collapse__body" :style="stylesComputed" ref="body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Inject, Ref } from 'vue-property-decorator'
import { Options } from 'vue-class-component'
import VaIcon from '../va-icon/VaIcon.vue'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin, getColor } from '../../../services/ColorThemePlugin'
import { getHoverColor } from '../../../services/color-functions'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

const PropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  header: { type: String, default: '' },
  icon: { type: String, default: '' },
  solid: { type: Boolean, default: false },
  color: { type: String, default: '' },
  textColor: { type: String, default: '' },
  colorAll: { type: Boolean, default: false },
})

const TEXT_NODE_TYPE = 3

@Options({
  components: { VaIcon },
})
export default class VaCollapse extends Mixins(
  KeyboardOnlyFocusMixin,
  StatefulMixin,
  ColorThemeMixin,
  PropsMixin,
) {
  popout = undefined
  inset = undefined
  height = this.getHeight()
  transitionDuration = this.getTransitionDuration()
  mutationObserver: any = null
  valueCollapse = {
    value: undefined,
  }

  @Inject({
    default: () => ({
      onChildChange: () => undefined,
      onChildMounted: () => undefined,
    }),
  }) readonly accordion!: any

  @Ref() readonly body!: HTMLElement

  get valueProxy () {
    if (this.$parent?.$options?.name === 'VaAccordion') {
      return this.valueCollapse.value
    }
    return this.valueComputed
  }

  set valueProxy (value) {
    if (this.$parent?.$options?.name === 'VaAccordion') {
      this.valueCollapse.value = value
    }
    this.valueComputed = value
    this.setCollapseParams()
  }

  get computedClasses () {
    if ((this as any).$parent.$props) {
      this.popout = (this as any).$parent.$props.popout
      this.inset = (this as any).$parent.$props.inset
    }
    return {
      'va-collapse--disabled': this.c_disabled,
      'va-collapse--solid': this.c_solid,
      'va-collapse--active': this.c_solid && this.valueProxy,
      'va-collapse--popout': this.popout && this.valueProxy,
      'va-collapse--inset': this.inset && this.valueProxy,
    }
  }

  get contentStyle () {
    return {
      paddingLeft: this.c_icon && 0,
      color: this.c_textColor ? getColor(this, this.c_textColor) : '',
      backgroundColor: this.c_color ? this.colorComputed : '',
      boxShadow: this.isKeyboardFocused ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
    }
  }

  get stylesComputed () {
    if (this.valueProxy && (this as any).$slots.default()?.[0]) {
      return {
        height: this.height + 'px',
        transitionDuration: this.transitionDuration + 's',
        background:
          this.c_color && this.c_colorAll
            ? getHoverColor(this.colorComputed)
            : '',
      }
    }
    return {
      height: 0,
      transitionDuration: this.transitionDuration + 's',
    }
  }

  get collapseIndexComputed () {
    return this.c_disabled ? -1 : 0
  }

  onFocus () {
    this.KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }

  changeValue () {
    this.valueProxy = !this.valueProxy
    this.accordion.onChildChange(this, this.valueProxy)
  }

  getHeight () {
    const nodes = [...(this.body?.childNodes || [])] as HTMLElement[]
    return nodes.reduce((result: number, node: HTMLElement) => {
      result += node.nodeType === TEXT_NODE_TYPE ? this.getTextNodeHeight(node) : node.clientHeight
      return result
    }, 0)
  }

  getTransitionDuration () {
    const duration = this.height / 1000 * 0.2
    return duration > 0.2 ? duration : 0.2
  }

  getTextNodeHeight (textNode: Node) {
    const range = document.createRange()
    range.selectNodeContents(textNode)
    const rect = range.getBoundingClientRect()
    const height = rect.bottom - rect.top
    return height
  }

  setCollapseParams () {
    this.height = this.getHeight()
    this.transitionDuration = this.getTransitionDuration()
  }

  mounted () {
    this.mutationObserver = new MutationObserver(() => {
      this.setCollapseParams()
    })
    this.mutationObserver.observe(this.body, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    if (this.accordion) {
      this.accordion.onChildMounted(this)
    }
  }

  beforeDestroy () {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../vuestic-sass/resources/resources";

.va-collapse {
  transition: all 0.3s linear;

  &__body {
    transition: height linear 0.3s;
    overflow: hidden;
    margin-top: 0.1rem;
  }

  &__header {
    &__content {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      background-color: $light-gray3;
      box-shadow: 0 2px 3px 0 rgba(98, 106, 119, 0.25);
      border-radius: 0.375rem;
      align-items: center;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      padding-left: 1rem;
    }

    &__text {
      width: 100%;
    }

    &__icon {
      @include flex-center();

      min-width: 1.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: $gray;
    }
  }

  &--solid {
    box-shadow: 0 2px 3px 0 rgba(98, 106, 119, 0.25);
    border-radius: 0.375rem;

    .va-collapse {
      &__header {
        &__content {
          border-radius: 0.375rem;
          transition: ease-in 0.3s;
          box-shadow: none;
          background-color: $light-gray3;
        }
      }

      &__body {
        border-radius: 0 0 0.375rem 0.375rem;
        margin-top: 0;
      }
    }
  }

  &--popout {
    margin: -0.5rem;
    padding-top: 1rem;
  }

  &--inset {
    margin: 0.5rem;
  }

  &--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
