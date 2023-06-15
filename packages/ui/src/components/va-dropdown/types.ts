export type DropdownOffsetProp = number | [number, number]

export type CursorAnchor = {
  getBoundingClientRect(): {
    width: number,
    height: number,
    x: number,
    y: number,
    top: number,
    right: number,
    bottom: number,
    left: number
  },
  contextElement: HTMLElement | undefined
}
