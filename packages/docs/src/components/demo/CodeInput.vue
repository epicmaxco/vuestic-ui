<template>
  <div class="code-input">
    <input
      v-model="valueComputed"
      class="code-input__input"
      :style="{ width: `${textDivWidth}px` }"
    />
    <div class="code-input__text" ref="textDiv">{{ valueComputed }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, watch, onMounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: String },
})

const emit = defineEmits(['update:modelValue'])

const valueComputed = computed({
  get () { return props.modelValue },
  set (v) { emit('update:modelValue', v) },
})

const textDiv = ref<HTMLDivElement>()
const textDivWidth = ref(0)

watch(valueComputed, () => {
  nextTick(() => {
    textDivWidth.value = (textDiv.value?.offsetWidth || 0)
  })
})

onMounted(() => {
  textDivWidth.value = (textDiv.value?.offsetWidth || 0)
})

onUpdated(() => {
  textDivWidth.value = (textDiv.value?.offsetWidth || 0)
})
</script>

<style lang="scss" scoped>
  .code-input {
    color: currentColor;
    width: min-content;
    position: relative;
    display: inline-block;

    &__input {
      position: relative;
      border: none;
      padding: 0px 4px;
      box-sizing: content-box;
      background: transparent;
      z-index: 1;
      font-family: inherit;
      font-size: inherit;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--va-primary);
      z-index: 0;
      opacity: 0.2;
      border-radius: 4px;
    }

    &__text {
      position: fixed;
      white-space: pre;
      opacity: 0;
      left: -200%;
    }
  }
</style>
