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
  render: function (createElement) {
    const childNodes = this.$slots.default || []
    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index) => index === childNodesLength - 1

    const separatorNode = this.$slots.separator || [ this.separator ]

    const mkSeparatorComponent = () => createElement(
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

    const mkChildComponent = (child, index) => createElement(
      'span', {
        staticClass: 'va-breadcrumbs__item',
        style: {
          color: !isLastIndexChildNodes(index) ? this.computedThemesActiveColor : null,
        },
      },
      [ child ]
    )

    const children = []

    if (childNodesLength) {
      childNodes.forEach((child, index) => {
        children.push(mkChildComponent(child, index))

        if (!isLastIndexChildNodes(index)) {
          children.push(mkSeparatorComponent())
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
