<template>
  <div ref="elementRef" :class="{compact}" />
</template>

<script setup lang='ts'>
const props = defineProps<{sitekey: string}>()

const emit = defineEmits<{
  (e: "verified", token: string): void;
  (e: "expired"): void;
  (e: "error"): void;
}>()

const breakpoint = useBreakpoint()

const compact = computed(() => breakpoint.current && ['xs'].includes(breakpoint.current))

const elementRef = ref<HTMLElement>();
const widgetIdRef = ref<string>();

const recaptchaRef = useRecaptcha()

const reset = () => {
  widgetIdRef.value && recaptchaRef.value?.reset(widgetIdRef.value)
}

defineExpose({
  reset
})

watchEffect(() => {
  const recaptcha = recaptchaRef.value;
  const element = elementRef.value;
  if (recaptcha && element) {
    widgetIdRef.value = recaptcha.render(element, {
      sitekey: props.sitekey,
    callback: (token) => {
      emit('verified', token)
    },
      'expired-callback': () => {
      emit('expired')
    },
      'error-callback': () => {
      emit('error')
    }
    })
  }
})
</script>

<style lang="scss" scoped>
.compact {
  transform: scale(0.77);
  transform-origin: left;
}
</style>
