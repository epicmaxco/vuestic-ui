import { getCurrentInstance, onMounted, onUpdated, customRef } from 'vue'

export const useTemplateRef = (key: string) => {
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
