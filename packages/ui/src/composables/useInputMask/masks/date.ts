import { CursorPosition } from '../cursor'
import { Mask, MaskToken } from '../mask'

type MaskTokenDate = MaskToken & {
  expect: 'm' | 'd' | 'y' | string,
}

const parseTokens = (format: string) => {
  return format.split('').map((char) => {
    if (char === 'm' || char === 'd' || char === 'y') {
      return { static: false, expect: char }
    }

    return { static: true, expect: char }
  })
}

type MinorToken = { value: string, expect: string, static: boolean }
type MajorToken = { value: string, expect: string, tree: MinorToken[] }

const getMaxDays = (year: number, month: number) => {
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28
  }

  if ([4, 6, 9, 11].includes(month)) {
    return 30
  }

  return 31
}

export const createMaskDate = (format: string = 'yyyy/mm/dd'): Mask<MaskTokenDate, number> => {
  const tokens = parseTokens(format)

  return {
    format: (text: string) => {
      const minorTokens = [] as MinorToken[]
      let additionalTokens = 0
      let valueOffset = 0
      let tokenOffset = 0

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[tokenOffset]

        if (token.static) {
          minorTokens.push({ value: token.expect, expect: token.expect, static: true })
          tokenOffset++

          if (token.expect === text[i]) {
            valueOffset++
          } else {
            additionalTokens++
          }
          continue
        }

        if (text[valueOffset] === undefined) {
          break
        }

        if (!/\d/.test(text[valueOffset])) {
          valueOffset++
          continue
        }

        minorTokens.push({ value: text[valueOffset], expect: token.expect, static: false })
        valueOffset++
        tokenOffset++
      }

      const majorTokens = minorTokens.reduce((acc, p, index) => {
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

      const year = majorTokens.find((p) => p.expect === 'y')
      const month = majorTokens.find((p) => p.expect === 'm')

      majorTokens.forEach((p) => {
        if (p.expect === 'm') {
          const num = parseInt(p.value)

          if (num > 12) {
            p.value = '12'
          }

          if (num > 1 && num < 10) {
            p.value = '0' + num
            additionalTokens += 1
          }
        }

        if (p.expect === 'd') {
          const num = parseInt(p.value)

          const maxDays = getMaxDays(Number(year?.value), Number(month?.value))

          if (num > maxDays) {
            p.value = maxDays.toString()
          }

          if (num > 3 && num < 10) {
            p.value = '0' + num
            additionalTokens += 1
          }
        }
      })

      return {
        text: majorTokens.reduce((acc, p) => acc + p.value, ''),
        tokens: tokens,
        data: additionalTokens,
      }
    },
    handleCursor (cursorStart, cursorEnd, tokens, newTokens, data, additionalTokens = 0) {
      cursorStart.updateTokens(newTokens)
      cursorEnd.updateTokens(newTokens)
      cursorStart.moveForward(data.length + additionalTokens, CursorPosition.Any)
      cursorEnd.position = cursorStart.position
    },
    unformat: (text: string, tokens: MaskTokenDate[]) => {
      return text.replace(/\//g, '')
    },
    reverse: false,
  }
}
