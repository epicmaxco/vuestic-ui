import { getCurrentInstance, onMounted, onUpdated, customRef, Ref, isRef } from 'vue'
import { TemplateRef } from '../../../utils/unwrapEl'

export const useTemplateRef = (key: string | Ref<TemplateRef>) => {
  if (isRef(key)) {
    return key
  }

  const vm = getCurrentInstance()!

  let _trigger = () => {}

  const el = customRef((track, trigger) => {
    _trigger = trigger

    return {
      get () {
        track()
        return vm.proxy?.$refs[key] as HTMLElement | undefined
      },
      set (value) {},
    }
  })

  onMounted(_trigger)
  onUpdated(_trigger)

  return el
}
