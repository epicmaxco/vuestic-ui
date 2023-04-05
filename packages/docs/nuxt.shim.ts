// FIX: React JSX types that comes from @types/cleave
declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any
  }

  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any
  }
}
