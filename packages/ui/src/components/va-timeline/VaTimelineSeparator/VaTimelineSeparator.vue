<script lang="ts">
import { defineComponent, h } from 'vue'

import { useColors } from '../../../composables/useColor'

const componentName = 'va-timeline-separator'

export default defineComponent({
  name: componentName,
  props: {
    color: { type: String, default: 'primary' },
    vertical: { type: Boolean },
    active: { type: Boolean },
    activePrevious: { type: Boolean },
    activeNext: { type: Boolean },
  },
  setup (props) {
    const { getColor } = useColors()

    return () => h(
      'div',
      {
        class: {
          [componentName]: true,
          [`${componentName}--vertical`]: props.vertical,
        },
      },
      [
        h('div', {
          class: {
            [`${componentName}__line`]: true,
            [`${componentName}__line--active`]: props.activePrevious,
          },
          style: {
            backgroundColor: getColor(props.activePrevious ? props.color : 'divider'),
          },
        }),
        h('div', {
          class: {
            [`${componentName}__center`]: true,
            [`${componentName}__center--active`]: props.active,
          },
          style: {
            backgroundColor: getColor(props.active ? props.color : 'divider'),
          },
        }),
        h('div', {
          class: {
            [`${componentName}__line`]: true,
            [`${componentName}__line--active`]: props.activeNext,
          },
          style: {
            backgroundColor: getColor(props.activeNext ? props.color : 'divider'),
          },
        }),
      ],
    )
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
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
