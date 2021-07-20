<template>
  <div class="va-collapse" :class="computedClasses">
    <div
      class="va-collapse__header"
      v-on="SetupContext.keyboardFocusListeners"
      @click="changeValue()"
      @focus="$emit('focus')"
      @keydown.enter="changeValue()"
      @keydown.space="changeValue()"
      :tabindex="collapseIndexComputed"
    >
      <slot name="header" v-bind="{ value: valueProxy, hasKeyboardFocus: SetupContext.hasKeyboardFocus }">
        <div
          class="va-collapse__header__content"
          :style="contentStyle"
        >
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
    <div class="va-collapse__body" ref="body" :style="stylesComputed">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import { mixins, Options, prop, setup, Vue } from 'vue-class-component'
import VaIcon from '../va-icon'
import ColorMixin from '../../services/color-config/ColorMixin'
import { getHoverColor } from '../../services/color-config/color-functions'
import { StatefulMixin } from '../../mixins/StatefulMixin/StatefulMixin'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
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
  StatefulMixin,
  ColorMixin,
  PropsMixin,
) {
  height = 0
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

  SetupContext = setup(() => {
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    return {
      hasKeyboardFocus,
      keyboardFocusListeners,
    }
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
      boxShadow: this.SetupContext.hasKeyboardFocus ? '0 0 0.5rem 0 rgba(0, 0, 0, 0.3)' : '',
    }
  }

  get stylesComputed () {
    if (this.valueProxy && (this as any).$slots.default()?.[0]) {
      return {
        visibility: 'visible', // allows for better a11y and works well with height-transitions (compared to v-show (display: none in general)
        height: this.height + 'px',
        transitionDuration: this.transitionDuration + 's',
        background:
          this.color && this.colorAll
            ? getHoverColor(this.colorComputed)
            : '',
      }
    }
    return {
      visibility: 'hidden',
      height: this.height + 'px',
      transitionDuration: this.transitionDuration + 's',
    }
  }

  get collapseIndexComputed () {
    return this.disabled ? -1 : 0
  }

  changeValue () {
    if (!this.disabled) {
      this.valueProxy = !this.valueProxy
      this.accordion.onChildChange(this)
    }
  }

  getHeight () {
    if (!this.valueProxy) {
      return 0
    }

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
    this.getHeight()

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

<style lang="scss">
@import "../../styles/resources/resources";
@import "variables";

.va-collapse {
  transition: var(--va-collapse-transition, var(--va-swing-transition));

  &__body {
    transition: var(--va-collapse-body-transition);
    overflow: var(--va-collapse-body-overflow);
    margin-top: var(--va-collapse-body-margin-top);
  }

  &__header {
    &__content {
      display: var(--va-collapse-header-content-display);
      justify-content: var(--va-collapse-header-content-justify-content);
      cursor: var(--va-collapse-header-content-cursor);
      background-color: var(--va-collapse-header-content-background-color);
      box-shadow: var(--va-collapse-header-content-box-shadow, var(--va-block-box-shadow));
      border-radius: var(--va-collapse-header-content-border-radius, var(--va-block-border-radius));
      align-items: var(--va-collapse-header-content-align-items);
      padding-top: var(--va-collapse-header-content-padding-top);
      padding-bottom: var(--va-collapse-header-content-padding-bottom);
      padding-left: var(--va-collapse-header-content-padding-left);
    }

    &__text {
      width: var(--va-collapse-header-content-text-width);
    }

    &__icon {
      @include flex-center();

      min-width: var(--va-collapse-header-content-icon-min-width);
      margin-left: var(--va-collapse-header-content-icon-margin-left);
      margin-right: var(--va-collapse-header-content-icon-margin-right);
      color: var(--va-collapse-header-content-icon-color);
    }
  }

  &--solid {
    box-shadow: var(--va-collapse-solid-box-shadow);
    border-radius: var(--va-collapse-solid-border-radius);

    .va-collapse {
      &__header {
        &__content {
          border-radius: var(--va-collapse-solid-header-content-border-radius, var(--va-block-border-radius));
          transition: var(--va-collapse-solid-header-content-transition);
          box-shadow: var(--va-collapse-solid-header-content-box-shadow, var(--va-block-box-shadow));
          background-color: var(--va-collapse-solid-header-content-background-color);
        }
      }

      &__body {
        border-radius: var(--va-collapse-solid-body-border-radius);
        margin-top: var(--va-collapse-solid-body-margin-top);
      }
    }
  }

  &--popout {
    margin: var(--va-collapse-popout-margin);
  }

  &--inset {
    margin: var(--va-collapse-inset-margin);
  }

  &--disabled {
    @include va-disabled();

    pointer-events: none;
  }
}
</style>
