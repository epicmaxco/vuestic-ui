import { CursorPosition } from '../cursor'
import { Mask, MaskToken } from '../mask'

type MaskTokenDate = {
  expect: 'm' | 'd' | 'y',
  static: false,
} | { expect: string, static: true }

const parseTokens = (format: string) => {
  return format.split('').map((char) => {
    if (char === 'm' || char === 'd' || char === 'y') {
      return { static: false, expect: char }
    }

    return { static: true, expect: char }
  }) as MaskTokenDate[]
}

type MinorToken = { value: string, expect: string, static: boolean }
type MajorToken = { value: string, expect: string, tree: MinorToken[], used?: boolean }

const getFebMaxDays = (year: number) => {
  if (Number.isNaN(year)) {
    return 29 // Return max possible days: We need year first
  }

  return year % 4 === 0 ? 29 : 28
}

const getMaxDays = (year: number, month: number) => {
  if (Number.isNaN(month)) {
    return 31
  }

  if (month === 2) {
    return getFebMaxDays(year)
  }

  if ([4, 6, 9, 11].includes(month)) {
    return 30
  }

  return 31
}

const removeStaticCharsFromEnd = <T extends MaskToken>(tokens: T[]) => {
  let i = tokens.length - 1

  while (tokens[i] && tokens[i].static) {
    i--
  }

  return tokens.slice(0, i + 1)
}

export const createDateMask = (format: string = 'yyyy/mm/dd'): Mask<MaskToken, MinorToken[]> => {
  const tokens = parseTokens(format)

  const cache = new Map()

  return {
    format (text: string) {
      const minorTokens = [] as MinorToken[]
      let valueOffset = 0
      let tokenOffset = 0

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[tokenOffset]

        if (token.static) {
          minorTokens.push({ value: token.expect, expect: token.expect, static: true })
          tokenOffset++

          if (token.expect === text[valueOffset]) {
            valueOffset++
          }
          continue
        }

        if (text[valueOffset] === undefined) {
          break
        }

        if (!/\d/.test(text[valueOffset])) {
          const nextTokensHasStatic = tokens.slice(tokenOffset, text.length).some((t) => t.static)

          if (nextTokensHasStatic) {
            tokenOffset++
          } else {
            valueOffset++
          }

          continue
        }

        minorTokens.push({ value: text[valueOffset], expect: token.expect, static: false })
        valueOffset++
        tokenOffset++
      }

      const majorTokens = removeStaticCharsFromEnd(minorTokens).reduce((acc, p, index) => {
        if (acc[acc.length - 1]?.expect === p.expect) {
          acc[acc.length - 1].value += p.value
          acc[acc.length - 1].tree.push(p)
          return acc
        }

        acc.push({
          value: p.value,
          expect: p.expect,
          tree: [p],
        })

        return acc
      }, [] as MajorToken[])

      majorTokens.forEach((t, index, array) => {
        if (t.expect === 'm') {
          const num = parseInt(t.value)

          if (num > 12) {
            t.value = '12'
            t.tree[0].static = true
            t.tree[1].static = false
          }

          if (num < 1 && t.value.length === 2) {
            t.value = '01'
            t.tree[0].static = true
            t.tree[1].static = false
          }

          if (num > 1 && num < 10 && t.value.length === 1) {
            t.value = '0' + num
            t.tree.unshift({ value: '0', expect: 'm', static: true })
            t.tree[1].static = false
          }
        }

        if (t.expect === 'd') {
          // Find corresponding year and month
          // If it is first day we found, seek first year and month
          // If it is second day we found, seek second year and month
          // and so on
          const year = majorTokens.find((t) => t.expect === 'y' && t.used === undefined)
          const month = majorTokens.find((t) => t.expect === 'm' && t.used === undefined)
          if (year) { year.used = true }
          if (month) { month.used = true }

          const m = Number(month?.value)

          const maxDays = getMaxDays(Number(year?.value), m)

          if (m === 2) { // Only for February
            if (Number(t.value) >= 29) {
              t.value = '29'
            }

            // If cached 29, means previously user entered 29, but it changed to
            // 28 accidentally, when previous year changed to non-leap year
            if (t.value === '28' && cache.get(index) === '29') {
              t.value = '29'
            }

            cache.set(index, t.value)
          }

          const num = parseInt(t.value)

          if (num > maxDays && t.value.length === 2) {
            t.value = maxDays.toString()
            t.tree[0].static = true
            t.tree[1].static = false
          }

          if (num < 1 && t.value.length === 2) {
            t.value = '01'
            t.tree[0].static = true
            t.tree[1].static = false
          }

          if (num > 3 && num < 10 && t.value.length === 1) {
            t.value = '0' + num
            t.tree.unshift({ value: '0', expect: 'd', static: true })
            t.tree[1].static = false
          }
        }
      })

      const newText = majorTokens.reduce((acc, p) => acc + p.value, '')

      const newTokens = tokens.map((t) => ({
        ...t,
        static: false,
      }))

      return {
        text: newText,
        tokens: newTokens,
        data: majorTokens.reduce((acc, p) => acc.concat(p.tree), [] as MinorToken[]),
      }
    },
    handleCursor (cursorStart, cursorEnd, oldTokens, newTokens, data, minorTokens) {
      cursorStart.updateTokens(minorTokens!)
      cursorEnd.updateTokens(minorTokens!)
      cursorStart.moveForward(data.length, CursorPosition.AfterChar)
      cursorEnd.position = cursorStart.position
    },
    unformat: (text: string, tokens: MaskToken[]) => {
      return text.replace(/\//g, '')
    },
  }
}
