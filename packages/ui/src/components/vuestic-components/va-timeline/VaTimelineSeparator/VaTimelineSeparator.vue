<script>
import { h } from 'vue'
import { useColor } from '../../../../services/color-config/ColorMixin'

const $root = 'va-timeline-separator'

export default {
  name: $root,
  props: {
    color: {
      type: String,
      default: 'success',
    },
    vertical: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
    activePrevious: {
      type: Boolean,
    },
    activeNext: {
      type: Boolean,
    },
  },
  setup () {
    const getColor = useColor()

    return {
      getColor,
    }
  },
  render () {
    return h(
      'div',
      {
        class: {
          [$root]: true,
          [`${$root}--vertical`]: this.$props.vertical,
        },
      },
      [
        h('div', {
          class: {
            [`${$root}__line`]: true,
            [`${$root}__line--active`]: this.$props.activePrevious,
          },
          style: {
            backgroundColor: this.$props.activePrevious ? this.getColor(this.$props.color) : '#dddddd',
          },
        }),
        h('div', {
          class: {
            [`${$root}__center`]: true,
            [`${$root}__center--active`]: this.$props.active,
          },
          style: {
            backgroundColor: this.$props.active ? this.getColor(this.$props.color) : '#dddddd',
          },
        }),
        h('div', {
          class: {
            [`${$root}__line`]: true,
            [`${$root}__line--active`]: this.$props.activeNext,
          },
          style: {
            backgroundColor: this.$props.activeNext ? this.getColor(this.$props.color) : '#dddddd',
          },
        }),
      ],
    )
  },
}
</script>

<style lang="scss">
@import 'src/components/vuestic-sass/resources/resources';

.va-timeline-separator {
  display: flex;
  align-items: center;

  &--vertical {
    flex-direction: column;
  }

  &__line {
    transition: background-color ease 0.5s;
    width: 0.125rem;
    height: 0.125rem;
    flex: 1;
  }

  &__center {
    transition: background-color ease 0.5s;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
  }
}
</style>
