import { inject, InjectionKey } from 'vue'

export const useStrictInject = <T>(injectionSymbol: InjectionKey<T>, errorMessage: string): T => {
  const strictInjection = inject<T>(injectionSymbol)

  if (!strictInjection) {
    throw new Error(errorMessage)
  }

  return strictInjection
}
