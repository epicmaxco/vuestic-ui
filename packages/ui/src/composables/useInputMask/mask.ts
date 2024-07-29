import { Cursor } from './cursor'

export type MaskToken = {
  static: boolean,
}

export type Mask<Token extends MaskToken = MaskToken, Data = any> = {
  format: (text: string) => {
    text: string,
    tokens: Token[]
    data?: Data,
  },
  handleCursor: (selectionStart: Cursor<Token>, selectionEnd: Cursor<Token>, oldTokens: Token[], newTokens: Token[], text: string, data?: Data) => any,
  unformat: (text: string, tokens: Token[]) => string,
}
