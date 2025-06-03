import {ref, type Ref } from "vue";
import { type TemplateRef } from "../../../utils/unwrapEl";
import { useEvent } from "../event/useEvent";

export const useTransitionEnd = (el: Ref<TemplateRef>) => {
  const cbs: ((event: TransitionEvent) => void)[] = []

  const isTransitioning = ref(false)

  useEvent(
    "transitionstart",
    () => {
      isTransitioning.value = true
    },
    el
  )

  useEvent(
    ["transitionend", 'transitioncancel'],
    (event: TransitionEvent) => {
      isTransitioning.value = false
      cbs.forEach((cb) => {
        cb(event)
      })

      cbs.length = 0
    },
    el
  );

  const onTransitionEnd = (cb: (event: TransitionEvent) => void) => {
    cbs.push(cb)
  }

  const onCancel = [] as ((event: TransitionEvent) => void)[]

  const transitionEnd = () => new Promise<TransitionEvent>((resolve) => {
    cbs.push((event: TransitionEvent) => {
      resolve(event)
      onCancel.push(resolve)
    })
  })

  const cancel = () => {
    onCancel.forEach((cb) => {
      cb(new Event('cancel') as TransitionEvent)
    })
    onCancel.length = 0
  }

  return {
    isTransitioning,
    onTransitionEnd,
    transitionEnd,
    cancel,
  }
}
