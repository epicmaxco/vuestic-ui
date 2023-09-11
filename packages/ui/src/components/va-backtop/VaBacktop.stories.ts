import { VaBacktop } from './'
import { VaRadio } from '../va-radio'
import { userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaBacktop',
  component: VaBacktop,
}

export const Default = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop/>
  `,
})

Default.play = async ({ canvasElement, step }) => {
  window.scrollTo({ top: document.body.scrollHeight })
  await sleep()
  const backtop = canvasElement.querySelector('[role="button"]')

  await step('Appears on scroll', async () => {
    expect(backtop).not.toBeNull()
  })
}

export const Color = () => ({
  components: { VaBacktop },
  methods: {
    scroll() {
      window.scrollTo({ top: 400 , behavior: 'smooth' })
    },
  },
  mounted() {
    this.scroll()
  },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop color="warning"/>
  `,
})

export const Offset = () => ({
  components: { VaBacktop },
  methods: {
    scroll() {
      window.scrollTo({ top: 400  , behavior: 'smooth' })
    },
  },
  mounted() {
    this.scroll()
  },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop 
      horizontalOffset="4rem" 
      verticalOffset="4rem"
    />
  `,
})

export const Position = () => ({
  components: { VaBacktop, VaRadio },
  data: () => { 
    const OPTIONS_X = ['left', 'right']
    const OPTIONS_Y = ['top', 'bottom']
    return { optionsY: OPTIONS_Y, valueY: OPTIONS_Y[1], optionsX: OPTIONS_X, valueX: OPTIONS_X[1] }
  },
  template: `
    [Horizontal Position]
    <va-radio v-model="valueY" :options="optionsY"/>
    [Vertical Position]
    <va-radio v-model="valueX" :options="optionsX"/>
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop 
      :horizontalPosition="valueX"
      :verticalPosition="valueY"
    />
  `,
})

export const ClickEvent = () => ({
  components: { VaBacktop },
  data: () => ({ clicked: false }),
  methods: {
    scroll() {
      window.scrollTo({ top: 400  , behavior: 'smooth' })
    },
  },
  mounted() {
    this.scroll()
  },
  template: `
    [clicked: {{ clicked }}]
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop @click="this.clicked = true"/>
  `,
})

export const Target = () => ({
  components: { VaBacktop },
  methods: {
    scroll() {
      this.$refs.notTarget.scrollTo({ top: 400, behavior: 'smooth' })
    },
  },
  mounted() {
    this.scroll()
  },
  template: `
    [not the target]
    <div id="notTarget" ref="notTarget" class="h-48 overflow-y-auto">
      <p class="m-1">{{$vb.lorem(10000)}}</p>
    </div>
    [the target]
    <div id="target" class="h-48 overflow-y-auto">
      <p class="m-1">{{$vb.lorem(10000)}}</p>
    </div>
    <va-backtop target="#target"/>
  `,
})