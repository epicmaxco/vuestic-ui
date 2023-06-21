// Is used to test following paths /en, /en/, /en/something, /ru, /ru/, /ru/something
const langTestRegex = /^\/(en|ru)\/?$|^\/(en|ru)\/.*/i
// Is used to replace /en, /en/, /ru, /ru/ from the beginning of the path
const langReplaceRegex = /^\/(en|ru)\/?/i

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path;
  if (langTestRegex.test(path)) {
    const newPath = path.replace(langReplaceRegex, '/')
    // safety check to avoid infinite redirects
    if (newPath !== path) {
      return navigateTo(to.path.replace(langReplaceRegex, '/'))
    }
  }
})
