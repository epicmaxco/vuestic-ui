<script setup lang="ts">
import { computed, ref } from 'vue'
import { getScrollbarSize } from '../../utils/scrollbar-size'
import { useEvent, useElementRect, useResizeObserver, useNumericProp } from '../../composables'

const props = withDefaults(defineProps<{
    el?: HTMLElement | null
    direction?: 'vertical' | 'horizontal',
    offset?: number | string,
  }>(), {
  direction: 'horizontal',
  offset: 0,
})
const currentEl = ref(null as HTMLElement | null)

const offsetProp = useNumericProp('offset')

const parentElement = computed(() => {
  if (props.el) { return props.el }

  return currentEl.value?.parentNode as HTMLElement ?? null
})

const parentRect = useElementRect(parentElement)

const stickyScrollWrapperStyle = computed(() => {
  const el = parentElement.value

  if (!el) { return {} }

  const parentEl = el as HTMLElement

  const scrollSize = getScrollbarSize(parentEl)

  const { bottom, left, right, top } = parentRect.value

  if (props.direction === 'vertical') {
    if (left > window.innerWidth) { return { display: 'none' } }
    if (right < window.innerWidth) { return { display: 'none' } }

    return {
      position: 'fixed' as const,
      top: `${top}px`,
      right: 0,
      height: `${parentEl.clientHeight}px`,
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
    }
  }

  if (top > window.innerHeight) { return { display: 'none' } }
  if (bottom < window.innerHeight) { return { display: 'none' } }

  return {
    position: 'fixed' as const,
    top: `${Math.min(bottom, window.innerHeight) - scrollSize - Number(offsetProp.value)}px`,
    width: `${parentEl.clientWidth}px`,
    overflowX: 'auto' as const,
    overflowY: 'hidden' as const,
  }
})

useEvent('scroll', (e) => {
  if (!currentEl.value) { return }

  if (props.direction === 'horizontal') {
    parentElement.value?.scrollTo({
      left: currentEl.value.scrollLeft,
    })
  } else {
    parentElement.value?.scrollTo({
      top: currentEl.value.scrollTop,
    })
  }
}, currentEl)

useEvent('scroll', (e) => {
  if (!currentEl.value) { return }

  if (props.direction === 'horizontal') {
    if (parentElement.value?.scrollLeft === currentEl.value.scrollLeft) { return }

    currentEl.value.scrollTo({
      left: parentElement.value?.scrollLeft,
    })
  } else {
    if (parentElement.value?.scrollTop === currentEl.value.scrollTop) { return }

    currentEl.value.scrollTo({
      top: parentElement.value?.scrollTop,
    })
  }
}, parentElement)

const scrollWidth = ref(0)
const scrollHeight = ref(0)

useResizeObserver(computed(() => {
  if (!parentElement.value) { return [] }

  return [...parentElement.value.children] as HTMLElement[]
}), () => {
  scrollWidth.value = parentElement.value.scrollWidth
  scrollHeight.value = parentElement.value.scrollHeight
})

const fakeContentStyle = computed(() => {
  if (props.direction === 'vertical') {
    return {
      width: '1px',
      height: `${scrollHeight.value}px`,
    }
  }

  return {
    height: '1px',
    width: `${scrollWidth.value}px`,
  }
})
</script>

<template>
  <div :style="stickyScrollWrapperStyle" ref="currentEl">
    <div :style="fakeContentStyle"></div>
  </div>
</template>
