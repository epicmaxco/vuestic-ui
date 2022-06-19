import { computed, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, Ref, ref } from 'vue'

const extractHTMLElement = (el: any): HTMLElement => el && '$el' in el ? el.$el : el

export const useTemplateRef = (key: string) => {
  const vm = getCurrentInstance()!
  const el = ref<HTMLElement | undefined>()

  const updateEl = () => {
    el.value = vm.proxy?.$refs[key] as HTMLElement
  }

  onMounted(updateEl)
  onUpdated(updateEl)
  onBeforeUnmount(updateEl)

  return el
}

export const useHTMLElement = (key?: string): Ref<HTMLElement> => {
  if (key) {
    const el = useTemplateRef(key)
    return computed({
      get () { return extractHTMLElement(el.value) },
      set (value) { el.value = value },
    })
  }

  const el = ref()
  return computed({
    set (value) {
      el.value = extractHTMLElement(value)
    },
    get () { return el.value },
  })
}
