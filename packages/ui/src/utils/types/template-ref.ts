import { ComponentPublicInstance } from 'vue'

export type TemplateRef = HTMLElement | (ComponentPublicInstance) | null | undefined | { $el: HTMLElement };
