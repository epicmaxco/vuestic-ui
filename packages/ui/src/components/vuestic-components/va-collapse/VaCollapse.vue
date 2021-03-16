<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header"
      @click="changeValue()"
      :tabindex="collapseIndexComputed"
      @mousedown="hasMouseDown = true"
      @mouseup="hasMouseDown = false"
      @focus="onFocus()"
      @blur="isKeyboardFocused = false"
    >
      <slot name="header">
        <div class="va-collapse__header__content" :style="contentStyle">
          <va-icon
            v-if="icon"
            class="va-collapse__header__icon"
            :name="icon"
            :color="textColor"
          />
          <div class="va-collapse__header__text">
            {{ header }}
          </div>
          <va-icon
            class="va-collapse__header__icon"
            :name="valueProxy ? 'expand_less' : 'expand_more'"
            :color="textColor"
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
import { inject } from 'vue'
import { mixins, Options, prop, setup, Vue } from 'vue-class-component'
import VaIcon from '../va-icon'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { getHoverColor } from '../../../services/color-config/color-functions'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'
import { Accordion, AccordionServiceKey } from '../va-accordion/VaAccordion.vue'

class Props {
  value = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  header = prop<string>({ type: String, default: '' })
  icon = prop<string>({ type: String, default: '' })
  solid = prop<boolean>({ type: Boolean, default: false })
  color = prop<string>({ type: String, default: '' })
  textColor = prop<string>({ type: String, default: '' })
  colorAll = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

const TEXT_NODE_TYPE = 3

@Options({
  name: 'VaCollapse',
  components: { VaIcon },
  emits: ['focus'],
})
export default class VaCollapse extends mixins(
  KeyboardOnlyFocusMixin,
  StatefulMixin,
  ColorMixin,
  PropsMixin,
) {
  height = this.getHeight()
  transitionDuration = this.getTransitionDuration()
  mutationObserver: any = null
  valueCollapse = {
    value: undefined,
  }

  accordion: Accordion = setup(() => {
    return inject(
      AccordionServiceKey,
      {
        isInsideAccordion: false,
        getProps: () => undefined,
        getState: () => undefined,
        onChildChange: (ctx: any) => undefined,
        onChildMounted: (ctx: any) => undefined,
        onChildUnmounted: (ctx: any) => undefined,
      })
  })

  get body (): HTMLElement {
    return this.$refs?.body as HTMLElement
  }

  get valueProxy () {
    if (this.accordion.isInsideAccordion) {
      return this.valueCollapse.value
    }

    return this.valueComputed
  }

  set valueProxy (value) {
    if (this.accordion.isInsideAccordion) {
      this.valueCollapse.value = value
    }

    this.valueComputed = value
    this.setCollapseParams()
  }

  get computedClasses () {
    const accordionProps = this.accordion.getProps()

    return {
      'va-collapse--disabled': this.disabled,
      'va-collapse--solid': this.solid,
      'va-collapse--active': this.solid && this.valueProxy,
      'va-collapse--popout': accordionProps?.popout && this.valueProxy,
      'va-collapse--inset': accordionProps?.inset && this.valueProxy,
    }
  }

  get contentStyle () {
    return {
      paddingLeft: this.icon && 0,
      color: this.textColor ? this.theme.getColor(this.textColor) : '',
      backgroundColor: this.color ? this.colorComputed : '',
      boxShadow: this.isKeyboardFocused ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
    }
  }

  get stylesComputed () {
    if (this.valueProxy && (this as any).$slots.default()?.[0]) {
      return {
        height: this.height + 'px',
        transitionDuration: this.transitionDuration + 's',
        background:
          this.color && this.colorAll
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
    return this.disabled ? -1 : 0
  }

  onFocus () {
    this.KeyboardOnlyFocusMixin_onFocus()
    this.$emit('focus')
  }

  changeValue () {
    this.valueProxy = !this.valueProxy
    this.accordion.onChildChange(this)
  }

  getHeight () {
    // @ts-ignore
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

    return rect.bottom - rect.top
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
    if (this.accordion.isInsideAccordion) {
      this.accordion.onChildMounted(this)
    }
  }

  beforeUnmount () {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
    if (this.accordion.isInsideAccordion) {
      this.accordion.onChildUnmounted(this)
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
