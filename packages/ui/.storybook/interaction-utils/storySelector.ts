export function getStoryId(id: string): HTMLElement {
  return document.querySelector(`[data-testid="${id}"]`) as HTMLElement
}

export function getStoryIdAll(id: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(`[data-testid="${id}"]`)
}

export function getStorySelector(selector: string): HTMLElement {
  return document.querySelector(selector) as HTMLElement
}

export function getStorySelectorAll(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector)
}