<template>
  <component class="va-skeleton" :class="classes" :is="tag">
    <slot />
    <div class="va-skeleton-wave" v-if="animation === 'wave'" />
  </component>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, PropType, onBeforeUnmount } from 'vue'
import { useBem, useColors } from '../../composables'

export default defineComponent({
  name: 'VaSkeleton',

  props: {
    color: { type: String, default: 'backgroundElement' },
    delay: { type: Number, default: 100 },

    tag: { type: String, default: 'div' },
    inline: { type: Boolean, default: false },

    animation: { type: String as PropType<'pulse' | 'wave' | 'none'>, default: 'pulse' },

    lines: { type: Number, default: 1 },
    height: { type: [Number, String], default: '1em' },
    width: { type: [String], default: '100%' },
    lineGap: { type: String, default: '8px' },
    textWidth: { type: [String], default: '75%' },

    variant: { type: String as PropType<'text' | 'circle' | 'rounded' | 'squared'>, default: 'squared' },
  },

  setup (props, { attrs }) {
    const doShow = ref(false)

    let timeoutId: ReturnType<typeof setTimeout>
    onMounted(() => {
      setTimeout(() => {
        doShow.value = true
      }, props.delay)
    })
    onBeforeUnmount(() => {
      clearTimeout(timeoutId)
    })

    const heightComputed = computed(() => {
      if (props.variant === 'text') {
        return `${props.lines}em`
      }

      return props.height
    })
    const widthComputed = computed(() => {
      if (props.variant === 'circle') {
        return heightComputed.value
      }

      if (typeof props.width === 'number') {
        return `calc(100% * ${props.width})`
      }

      return props.width
    })

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))
    const negativeLineGap = computed(() => `-${props.lineGap}`)

    const bem = useBem('va-skeleton', () => ({
      lines: props.lines > 1,
      text: props.variant === 'text',
      circle: props.variant === 'circle',
      hidden: !doShow.value,
      inline: props.inline,
      pulse: props.animation === 'pulse',
      wave: props.animation === 'wave',
    }))

    const borderRadius = computed(() => {
      if (props.variant === 'circle') { return '50%' }
      if (props.variant === 'rounded') { return `calc(${heightComputed.value} / 5)` }

      return '0px'
    })

    return {
      classes: computed(() => [
        ...Object.keys(bem),
        (attrs as { class: string }).class,
      ]),

      colorComputed,
      negativeLineGap,
      doShow,
      heightComputed,
      widthComputed,
      borderRadius,
    }
  },
})
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1);
  }

  75% {
    filter: brightness(0.9);
  }

  100% {
    filter: brightness(1);
  }
}

@keyframes wave {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.va-skeleton {
  $line-height: 1em;

  background: v-bind(colorComputed);
  height: v-bind(heightComputed);
  width: v-bind(widthComputed);
  border-radius: v-bind(borderRadius);

  &--pulse {
    animation: 2s ease-in-out 0.5s infinite normal none running pulse;
  }

  &--wave {
    mask-image: -webkit-radial-gradient(white, black);

    .va-skeleton-wave {
      position: absolute;
      overflow: hidden;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;

      &::after {
        mask-image: -webkit-radial-gradient(white, black);
        display: block;
        position: relative;
        content: '';
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(100, 100, 100, 0.08), transparent);
        animation: 1.6s linear 0.5s infinite normal none running wave;
      }
    }
  }

  &--hidden { display: none; }

  &--inline { display: inline-block; }

  &--lines {
    // Stripes background, so it looks like a lot of lines
    background:
      repeating-linear-gradient(
        0deg,
        v-bind(colorComputed),
        v-bind(colorComputed) calc($line-height - v-bind(lineGap) / 2),
        transparent calc($line-height - v-bind(lineGap) / 2),
        transparent $line-height,
      );
    background-position-y: calc(v-bind(lineGap) / -2);
  }

  &--text {
    width: 100%;
    clip-path:
      polygon(
        0% 0%,
        0% 100%,
        v-bind(textWidth) 100%,
        v-bind(textWidth) calc(100% - $line-height),
        100% calc(100% - $line-height),
        100% 100%,
        $line-height 100%,
        v-bind(textWidth) 100%,
        100% 100%,
        100% 0%
      );
  }

  &--circle {
    min-width: v-bind(widthComputed);
    min-height: v-bind(heightComputed);
  }
}
</style>
