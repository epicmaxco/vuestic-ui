<script>
import Vue from 'vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'

export default Vue.component('va-breadcrumbs-provider', {
  name: 'va-breadcrumbs',
  mixins: [ColorThemeMixin, AlignMixin],
  props: {
    color: {
      type: String,
      default: 'gray',
    },
    separatorColor: {
      type: String,
      default: null,
    },
    activeColor: {
      type: String,
      default: null,
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  computed: {
    computedStyles () {
      return this.alignComputed
    },
    computedThemesSeparatorColor () {
      return this.$themes[this.separatorColor || this.color]
    },
    computedThemesActiveColor () {
      return this.$themes[this.activeColor || this.color]
    },
  },
  render (createElement) {
    const childNodes = this.$slots.default || []
    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index) => index === childNodesLength - 1

    const separatorNode = this.$slots.separator || [ this.separator ]

    const createSeparatorComponent = () => createElement(
      'span',
      {
        staticClass: 'va-breadcrumbs__separator',
        class: this.computedClass,
        style: {
          color: this.computedThemesSeparatorColor,
        },
      },
      separatorNode
    )

    const isDisabledChild = (child) => {
      const childPropData = child && child.componentOptions && child.componentOptions.propsData
      if (!childPropData || !childPropData.hasOwnProperty('disabled')) {
        return false
      }

      if (childPropData.disabled === '') { // NOTE: by default empty attribute is ''
        return true
      }

      return Boolean(childPropData.disabled)
    }

    const createChildComponent = (child, index) => createElement(
      'span', {
        staticClass: 'va-breadcrumbs__item',
        style: {
          color: !isLastIndexChildNodes(index) && !isDisabledChild(child) ? this.computedThemesActiveColor : null,
        },
      },
      [ child ]
    )

    const children = []

    if (childNodesLength) {
      childNodes.forEach((child, index) => {
        children.push(createChildComponent(child, index))

        if (!isLastIndexChildNodes(index)) {
          children.push(createSeparatorComponent())
        }
      })
    }

    return createElement('div', {
      staticClass: 'va-breadcrumbs',
      style: {
        ...this.computedStyles,
      },
    }, children)
  },
})
</script>

<style lang="scss">
.va-breadcrumbs {
  display: flex;
  width: 100%;
  justify-content: center;

  &__item {
    display: inline-flex;
  }

  &__separator {
    padding: 0 0.5rem;
    display: inline-flex;
  }
}

</style>
