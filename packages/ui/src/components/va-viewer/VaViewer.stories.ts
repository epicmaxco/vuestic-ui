import { defineComponent } from 'vue'
import { VaViewer } from './'
import { VaImage } from '../va-image'
import { VaIcon } from '../va-icon'
import { userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaViewer',
  component: VaViewer,
  tags: ['autodocs'],
}

const getImagePath = (width, height = 0) => `https://picsum.photos/id/450/${width}/${height || width}`

export const Default = () => ({
  components: { VaViewer, VaImage },
  data: () => ({ getImagePath }),
  template: `
    <va-viewer>
      <va-image
        :src="getImagePath(600, 800)"
        :max-width="200"
      >
        <template #loader>
          Loading...
        </template>
      </va-image>
    </va-viewer>
  `,
})

Default.play = async ({ canvasElement, step }) => {
  const viewer = canvasElement.querySelector('.va-viewer')
  await step('Click on image to show a magnified view', async () => {
    const beforeClick = canvasElement.querySelectorAll('.va-viewer-content')
    expect(beforeClick.length).toBe(0)
    userEvent.click(viewer)
    await sleep()
    const afterClick = canvasElement.querySelectorAll('.va-viewer-content')
    expect(afterClick.length).toBe(1)
  })
}

export const CustomAnchor = () => ({
  components: { VaViewer, VaImage },
  data: () => ({ getImagePath }),
  template: `
    <va-viewer>
      <template #anchor="{ openViewer }">
        <button
          @click="openViewer"
        >
          Open image
        </button>
      </template>
      <template #image>
        <va-image
          :src="getImagePath(600, 800)"
          :max-width="200"
        />
      </template>
    </va-viewer>
  `,
})

export const CustomControls = () => ({
  components: { VaViewer, VaImage, VaIcon },
  data: () => ({ getImagePath }),
  template: `
    <va-viewer>
      <va-image
        :src="getImagePath(600, 800)"
        :max-width="200"
      />
      <template #controls>
        <button
          @click="$vb.log('Make some stuff.')"
        >
          <va-icon
            name="warning"
            color="warning"
          />
        </button>
      </template>
      <template #close="{ close }">
        <button
          @click="close"
        >
          Close
        </button>
      </template>
    </va-viewer>
  `,
})
