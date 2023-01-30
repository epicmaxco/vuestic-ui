import { useNuxt } from '@nuxt/kit';
import type { Nuxt, NuxtOptions } from "@nuxt/schema";
import type { VuesticOptions } from "../types";

const VUESTIC_DEFAULT_FONTS = [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
]

const registerDefaultFonts = (nuxt: Nuxt) => {
  nuxt.options.app = nuxt.options.app || {} as NuxtOptions['app']
  nuxt.options.app.head = nuxt.options.app.head || {}
  nuxt.options.app.head.link = nuxt.options.app.head.link || []
  nuxt.options.app.head.link.push(...VUESTIC_DEFAULT_FONTS)
}

/** Register CSS modules */
export const useVuesticCSS = (options: VuesticOptions) => {
  const nuxt = useNuxt()

  if (Array.isArray(options.css)) {
    /** Register essential css. Vuestic will not work without essential.css */
    nuxt.options.css.push('vuestic-ui/dist/styles/essential.css')

    /** Register other css modules that user has chosen */
    options.css.forEach((cssModuleName) => {
      nuxt.options.css.push(`vuestic-ui/dist/styles/${cssModuleName}.css`)
    })
  } else if (options.css === true) {
    /** Register all CSS */
    nuxt.options.css.push('vuestic-ui/dist/styles/index.css')
  }

  if (options.fonts) {
    registerDefaultFonts(nuxt)
  }
  // Do not register any CSS if `options.css` is `false`
}
