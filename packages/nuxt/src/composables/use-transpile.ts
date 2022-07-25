import { useNuxt } from "@nuxt/kit"

/** Transpile vuestic-ui */
export const useTranspile = () => {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push('vuestic-ui')
}
