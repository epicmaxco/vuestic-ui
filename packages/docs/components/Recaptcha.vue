<template>
  <div ref="elementRef" />
</template>

<script setup lang='ts'>
const props = defineProps<{sitekey: string}>()

const emit = defineEmits<{
  (e: "verified", token: string): void;
  (e: "expired"): void;
  (e: "error"): void;
}>()

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

<style scoped lang='scss'>

</style>
