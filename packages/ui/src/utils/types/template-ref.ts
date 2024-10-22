import { ComponentPublicInstance, DefineComponent } from 'vue'

export type TemplateRef = HTMLElement | (ComponentPublicInstance) | null | undefined | { $el: HTMLElement };
