import { VaAffix } from './'
import { expect } from '@storybook/jest'

export default {
  title: 'VaAffix',
  component: VaAffix,
}

export const FixedTop = () => ({
  components: { VaAffix },
  template: `
    <div class="w-1/4">
      <p class="m-1">{{$vb.lorem(100)}}</p>
        <VaAffix :offset-top="100">
          <div class="p-3 bg-red-500">Fixed at the top: 100</div>
        </VaAffix>
      <p class="m-1">{{$vb.lorem(2500)}}</p>
    </div>
  `,
})

FixedTop.play = async ({ step }) => {
  window.scrollTo({ top: document.body.scrollHeight })
  const affix = document.querySelector('.va-affix--affixed') as HTMLElement

  await step('100px offset top', async () => {
    expect(affix.style.top).toEqual('100px')
  })
}

export const FixedBottom = () => ({
  components: { VaAffix },
  template: `
    <div class="w-1/4">
      <p class="m-1">{{$vb.lorem(2500)}}</p>
        <VaAffix :offset-bottom="100">
          <div class="p-3 bg-red-500">Fixed at the bottom: 100</div>
        </VaAffix>
      <p class="m-1">{{$vb.lorem(100)}}</p>
    </div>
  `,
})

FixedBottom.play = async ({ step }) => {
  window.scrollTo({ top: 0 })
  const affix = document.querySelector('.va-affix--affixed') as HTMLElement

  await step('100px offset bottom', async () => {
    expect(affix.style.bottom).toEqual('100px')
  })
}
