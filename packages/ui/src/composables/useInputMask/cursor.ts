import { MaskToken } from './mask'

export enum CursorPosition {
  BeforeChar = -1,
  Any = 0,
  AfterChar = 1
}

export class Cursor<Token extends MaskToken> extends Number {
  constructor (public position: number, private tokens: Token[], private reversed: boolean = false) {
    super(position)
  }

  private move (direction: -1 | 1, amount: number, cursorPosition = CursorPosition.Any) {
    if (this.tokens.every((t) => t.static)) {
      if (direction === 1) {
        this.position = this.tokens.length
        return this.position
      } else {
        this.position = 0
        return this.position
      }
    }

    for (let i = this.position; i <= this.tokens.length && i >= -1; i += direction) {
      const current = this.tokens[i]
      const next = this.tokens[i + direction]
      const prev = this.tokens[i - direction]

      if (amount < 0) {
        this.position = i
        return this.position
      }

      if (!current?.static) {
        amount--
      }

      if (cursorPosition <= CursorPosition.Any) {
        if (direction === -1 && !next?.static && current?.static) {
          amount--
        }
        if (direction === 1 && !prev?.static && current?.static) {
          amount--
        }
      }

      if (cursorPosition >= CursorPosition.Any) {
        if (direction === 1 && !prev?.static && current === undefined) {
          amount--
        } else if (direction === 1 && current === undefined && next?.static) {
          amount--
        } else if (direction === 1 && current === undefined && next === undefined) {
          amount--
        }
      }

      if (amount < 0) {
        this.position = i
        return this.position
      }
    }

    return this.position
  }

  moveBack (amount: number, cursorPosition = CursorPosition.Any) {
    return this.move(-1, amount, cursorPosition)
  }

  moveForward (amount: number, cursorPosition = CursorPosition.Any) {
    return this.move(1, amount, cursorPosition)
  }

  updateTokens (newTokens: Token[], fromEnd: boolean = false) {
    if (fromEnd) {
      // When reversed, we need to update position from the end
      this.position = this.tokens.length - this.position
      this.tokens = newTokens
      this.position = this.tokens.length - this.position
    } else {
      this.tokens = newTokens
    }
  }

  valueOf () {
    if (this.position < 0) {
      return 0
    }

    if (this.position > this.tokens.length) {
      return this.tokens.length
    }

    return this.position
  }
}
