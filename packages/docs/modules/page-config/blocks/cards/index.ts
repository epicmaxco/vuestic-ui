import { definePageConfigBlock } from '../../types'
import Component from './index.vue'
import { Card } from './types'

export default definePageConfigBlock({
  setup: (cards: Card | Card[]) => {
    return {
      type: 'cards' as const,
      cards
    }
  },
  component: Component,
})
