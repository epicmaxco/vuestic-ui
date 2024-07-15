import { watch, Ref } from 'vue';

export const useMutationObserver = (target: Ref<HTMLElement | null>, callback: () => void) => {
  let observer = new MutationObserver(callback);

  watch(target, (newValue, oldValue) => {
    if (oldValue) {
      observer.disconnect();
    }
    if (newValue) {
      observer.observe(newValue, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  })
}
