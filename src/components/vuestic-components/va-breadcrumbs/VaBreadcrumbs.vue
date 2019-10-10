<template>
  <va-breadcrumbs-provider
    class="va-breadcrumbs"
    :class="computedClass"
    :separator="separator"
    :color="color"
    :activeColor="activeColor"
    :separatorColor="separatorColor"
  >
    <slot />
    <template v-slot:separator>
      <slot name="separator">{{separator}}</slot>
    </template>
  </va-breadcrumbs-provider>
</template>

<script>
import Vue from 'vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

const vaBreadcrumbsProvider = Vue.component('va-breadcrumbs-provider', {
  mixins: [ColorThemeMixin],
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    separatorColor: {
      type: String,
      default: 'gray',
    },
    activeColor: {
      type: String,
      default: 'gray',
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  render: function (createElement) {
    const childNodes = this.$slots.default || []
    const childNodesLength = childNodes.length
    const separatorNode = this.$slots.separator
    const children = []

    const mkSeparatorComponent = () => createElement(
      'span',
      {
        attrs: {
          class: 'va-breadcrumbs__separator',
        },
        style: {
          color: this.$themes[this.separatorColor],
        },
      },
      separatorNode
    )

    const isLastIndexChildNodes = (index) => index === childNodesLength - 1

    const mkChildComponent = (child, index) => createElement('div', {
      style: {
        color: (this.activeColor && isLastIndexChildNodes(index)) ? this.$themes[this.activeColor] : this.$themes[this.color],
      },
      props: { disabled: true },
    }, [ child ])

    if (childNodesLength) {
      childNodes.forEach((child, index) => {
        children.push(mkChildComponent(child, index))

        if (!isLastIndexChildNodes(index)) {
          children.push(mkSeparatorComponent())
        }
      })
    }

    return createElement('div', children)
  },
})

export default {
  name: 'va-breadcrumbs',
  mixins: [ColorThemeMixin],
  components: {
    vaBreadcrumbsProvider,
  },
  props: {
    align: {
      type: String,
      default: 'left',
    },
    color: {
      type: String,
      default: 'primary',
    },
    separatorColor: {
      type: String,
      default: 'gray',
    },
    activeColor: {
      type: String,
      default: 'gray',
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  computed: {
    computedClass () {
      return {
        'va-breadcrumbs--left': !this.align || this.align === 'left',
        'va-breadcrumbs--right': this.align === 'right',
        'va-breadcrumbs--center': this.align === 'center',
        'va-breadcrumbs--between': this.align === 'between',
        'va-breadcrumbs--around': this.align === 'around',
      }
    },
  },
}
</script>

<style lang="scss">
.va-breadcrumbs {
  display: flex;
  width: 100%;
  justify-content: center;

  &.va-breadcrumbs--left {
    justify-content: flex-start;
  }

  &.va-breadcrumbs--right {
    justify-content: flex-end;
  }

  &.va-breadcrumbs--center {
    justify-content: center;
  }

  &.va-breadcrumbs--between {
    justify-content: space-between;
  }

  &.va-breadcrumbs--around {
    justify-content: space-around;
  }

  &__separator {
    padding: 0 0.5rem;
    display: inline-flex;
  }
}

</style>
