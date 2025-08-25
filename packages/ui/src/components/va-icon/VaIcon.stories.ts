import VaIconVue from './demo/VaIconVue.vue'
import { VaIcon } from './'

export default {
  title: 'VaIcon',
  component: VaIcon,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaIcon },
  template: `
    <div class="flex flex-col">
      [default]    
      <VaIcon name="book" />
      [Font Awesome]
      <VaIcon name="fas-book" />
      [Ionic]    
      <VaIcon name="ion-book" />
    </div>
  `,
})

export const Color = () => ({
  components: { VaIcon },
  template: `
    <VaIcon name="book" color="warning" />
  `,
})

export const Component = () => ({
  components: { VaIcon },
  setup: () => ({ component: VaIconVue }),
  template: `
    <VaIcon :component="component" />
  `,
})

export const Flip = () => ({
  components: { VaIcon },
  template: `
    <div class="flex flex-col items-start">
      [default]
      <VaIcon name="book" />
      [horizontal]
      <VaIcon name="book" flip="horizontal" />
      [vertical]
      <VaIcon name="book" flip="vertical" />
      [both]
      <VaIcon name="book" flip="both" />
    </div>
  `,
})

export const Size = () => ({
  components: { VaIcon },
  template: `
    <div class="flex flex-col">
      [default]    
      <VaIcon name="book" />
      [small]
      <VaIcon name="book" size="small" />
      [large]    
      <VaIcon name="book" size="large" />
      [28px]
      <VaIcon name="book" size="28px" />
    </div>
  `,
})

export const sizesConfig = () => ({
  components: { VaIcon },
  setup: () => ({ sizesConfig: { defaultSize: 10, sizes: { small: 5, medium: 10, large: 15 } } }),
  template: `
    <div class="flex flex-col">
      [default: 10px]    
      <VaIcon name="book" :sizesConfig="sizesConfig" />
      [small: 5px]
      <VaIcon name="book" size="small" :sizesConfig="sizesConfig" />
      [large: 15px]    
      <VaIcon name="book" size="large" :sizesConfig="sizesConfig" />
    </div>
  `,
})

export const Rotation = () => ({
  components: { VaIcon },
  template: `
    <VaIcon name="book" rotation="45" />
  `,
})

export const Spin = () => ({
  components: { VaIcon },
  template: `
    <VaIcon name="book" spin />
  `,
})

export const DefaultSlot = () => ({
  components: { VaIcon },
  template: `
    <div class="flex flex-col">
      [default]
      <VaIcon>
        book
      </VaIcon>
      [class="material-icons"]
      <VaIcon class="material-icons">
        book
      </VaIcon>
  </div>
  `,
})
