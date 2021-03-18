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
@import 'variables';

.va-timeline-separator {
  display: var(--va-timeline-separator-display);
  align-items: var(--va-timeline-separator-align-items);

  &--vertical {
    flex-direction: var(--va-timeline-separator-vertical-flex-direction);
  }

  &__line {
    transition: var(--va-timeline-separator-line-transition);
    width: var(--va-timeline-separator-line-width);
    height: var(--va-timeline-separator-line-height);
    flex: var(--va-timeline-separator-line-flex);
  }

  &__center {
    transition: var(--va-timeline-separator-center-transition);
    width: var(--va-timeline-separator-center-width);
    height: var(--va-timeline-separator-center-height);
    border-radius: var(--va-timeline-separator-center-border-radius);
  }
}
</style>
