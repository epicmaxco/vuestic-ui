export type Card = {
  title: string,
  text: string,
  link?: {
    text: string,
    href: string,
  },
  color?: string,
  cols?: number,
}
