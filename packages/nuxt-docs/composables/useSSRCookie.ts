import { useNuxtApp } from '#app'

type Cookie = Record<string, string>

const cookieParser = {
  parse(str: string) {
    if (!str) { return {} }

    return str
      .split('; ')
      .reduce((acc, cookie) => {
        const [key, value] = cookie.split('=')
        acc[key] = value
        return acc
      }, {} as Cookie)
  },
}

/** Respect SSR while accessing document */
const getDocument = () => typeof window === 'undefined' ? null : window.document

export const useSSRCookie = () => {
  const { ssrContext } = useNuxtApp()

  const getCookies = () => {
    if (ssrContext?.req) {  // Server
      return cookieParser.parse(ssrContext.req.headers.cookie)
    } else {                // Client
      return cookieParser.parse(getDocument().cookie)
    }
  }

  const getCookie = (cookie: string) => {
    return getCookies()[cookie]
  }

  const setCookie = (cookie: string, value: string, options: Record<string, any> = {}) => {
    let cookieStr = encodeURIComponent(cookie) + '=' + encodeURIComponent(value)

    options = {
      path: '/',    // Cross path cookie, available on whole domain
      secure: true, // Prevent Same-site warning
      ...options
    }

    Object.entries(options)
      .forEach(([key, option]) => {
        cookieStr += `; ${key}=${option}`
      })

    if (ssrContext?.res) { // Server
      ssrContext.res.setHeader('Set-Cookie', cookieStr)
    } else {               // Client
      getDocument().cookie = cookieStr
    }
  }

  return {
    getCookies,
    getCookie,
    setCookie
  }
}