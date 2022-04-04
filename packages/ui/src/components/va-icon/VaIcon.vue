<template>
  <component
    v-bind="computedAttrs"
    aria-hidden="true"
    notranslate
    class="va-icon"
    :is="computedTag"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot>{{ iconConfig.content }}</slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import omit from 'lodash/omit'

import { useColors } from '../../services/color-config/color-config'
import { useIcons } from '../../services/icon-config/icon-config'
import { useSize, useSizeProps } from '../../composables/useSize'

export default defineComponent({
  name: 'VaIcon',
  props: {
    ...useSizeProps,
    name: { type: String as PropType<string>, default: '' },
    tag: { type: String as PropType<string> },
    component: { type: Object as PropType<Record<string, any>> },
    color: { type: String as PropType<string> },
    rotation: { type: [String, Number] as PropType<number | string> },
    spin: { type: [String, Boolean] as PropType<string | boolean> },
    flip: {
      type: String as PropType<'off' | 'horizontal' | 'vertical' | 'both'>,
      default: 'off',
      validator: (value: string) => ['off', 'horizontal', 'vertical', 'both'].includes(value),
    },
  },
  setup (props, { attrs }) {
    const { getColor } = useColors()
    const { sizeComputed } = useSize(props)
    const { getIcon } = useIcons(props)

    const iconConfig = computed(() => getIcon(props.name))

    const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || 'i')

    const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit(attrs, ['class']) }))

    const getSpinClass = (spin?: string | boolean) => {
      if (spin === undefined || spin === false) { return }
      return spin === 'counter-clockwise' ? 'va-icon--spin-reverse' : 'va-icon--spin'
    }

    const computedClass = computed(() => [
      iconConfig.value.class,
      getSpinClass(props.spin ?? iconConfig.value.spin),
    ])

    const transformStyle = computed(() => {
      const rotation = props.rotation ? `rotate(${props.rotation}deg)` : ''

      const flipY = (props.flip === 'vertical' || props.flip === 'both') ? -1 : 1
      const flipX = (props.flip === 'horizontal' || props.flip === 'both') ? -1 : 1
      const scale = props.flip === 'off' ? '' : `scale(${flipY}, ${flipX})`

      return `${scale} ${rotation}`.trim()
    })

    const computedStyle = computed(() => ({
      transform: transformStyle.value,
      cursor: attrs.onClick ? 'pointer' : null,
      color: props.color ? getColor(props.color) : iconConfig.value.color,
      fontSize: sizeComputed.value,
    }))

    return {
      iconConfig,
      computedTag,
      computedAttrs,
      computedClass,
      computedStyle,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-icon {
  vertical-align: var(--va-icon-vertical-align);
  user-select: var(--va-icon-user-select);

  &#{&} {
    // need 2 classes to make it work
    font-style: normal;
  }

  &--spin {
    animation: va-icon--spin-animation 1500ms linear infinite;

    &-reverse {
      animation: va-icon--spin-animation 1500ms linear infinite;
      animation-direction: reverse;
    }
  }

  @keyframes va-icon--spin-animation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
