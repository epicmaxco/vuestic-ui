import { type MaskToken } from './mask'
import { describe, it, expect } from 'vitest'

import { Cursor, CursorPosition } from './cursor'

const makeTokens = (str: string) => str.split('').map((char) => ({ static: char === 's' })) as MaskToken[]

const printCursor = (cursor: Cursor<MaskToken>) => {
  const str = (cursor as any).tokens.map((t: MaskToken) => t.static ? 's' : 'd') as string[]
  const i = cursor.position
  str[i] = '|' + (str[i] ?? '')
  return str.join('')
}

describe('useInputMask/Cursor', () => {
  describe('Before Char', () => {
    describe('move forward', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(0, makeTokens('dsd'))

        expect(printCursor(cursor)).toBe('|dsd')
        cursor.moveForward(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('ds|d')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(0, makeTokens('dsssd'))

        expect(printCursor(cursor)).toBe('|dsssd')
        cursor.moveForward(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('dsss|d')
      })
    })

    describe('move back', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(3, makeTokens('dsd'))

        expect(printCursor(cursor)).toBe('dsd|')
        cursor.moveBack(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('ds|d')
        cursor.moveBack(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('|dsd')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(5, makeTokens('dsssd'))

        cursor.moveBack(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('dsss|d')

        cursor.moveBack(1, CursorPosition.BeforeChar)
        expect(printCursor(cursor)).toBe('|dsssd')
      })
    })
  })

  describe('After Char', () => {
    describe('move forward', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(0, makeTokens('dsd'))

        cursor.moveForward(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('d|sd')

        cursor.moveForward(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('dsd|')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(0, makeTokens('dsssd'))

        cursor.moveForward(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('d|sssd')

        cursor.moveForward(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('dsssd|')
      })
    })
    describe('move back', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(3, makeTokens('dsd'))

        cursor.moveBack(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('d|sd')

        cursor.moveBack(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('|dsd')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(5, makeTokens('dsssd'))

        cursor.moveBack(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('d|sssd')

        cursor.moveBack(1, CursorPosition.AfterChar)
        expect(printCursor(cursor)).toBe('|dsssd')
      })
    })
  })

  describe('Any Char p/move forward', () => {
    describe('move forward', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(0, makeTokens('dsd'))

        cursor.moveForward(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('d|sd')

        cursor.moveForward(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('ds|d')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(0, makeTokens('dsssd'))

        cursor.moveForward(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('d|sssd')

        cursor.moveForward(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('dsss|d')

        cursor.moveForward(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('dsssd|')
      })
    })

    describe('move back', () => {
      it('should move over one static token', () => {
        const cursor = new Cursor(3, makeTokens('dsd'))

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('ds|d')

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('d|sd')

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('|dsd')
      })

      it('should move over multiple static token', () => {
        const cursor = new Cursor(5, makeTokens('dsssd'))

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('dsss|d')

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('d|sssd')

        cursor.moveBack(1, CursorPosition.Any)
        expect(printCursor(cursor)).toBe('|dsssd')
      })
    })
  })
})
