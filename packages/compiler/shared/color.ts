const white = '\x1b[0m'
const reset = '\x1bRESET'

const red = '\x1b[31m'
const yellow = '\x1b[33m'
const cyan = '\x1b[36m'

/**
 * Formats a string for console output.
 * - Wraps text in square brackets with cyan color.
 * - If the string starts with '!!! ', it colors the rest of the string red.
 * - If the string starts with '! ', it colors the rest of the string yellow.
 * - Replaces all reset sequences with white color.
 */
export const formatString = (str: string) => {
  str = str.replace(/\[([^\]]*)\]/g, (_, p1) => cyan + p1 + reset)
  if (str.startsWith('!!! ')) {
    str = red + str.slice(4).replaceAll(reset, red) + reset
  }

  if (str.startsWith('! ')) {
    str = yellow + str.slice(2).replaceAll(reset, yellow) + reset
  }

  return str.replaceAll(reset, white)
}
