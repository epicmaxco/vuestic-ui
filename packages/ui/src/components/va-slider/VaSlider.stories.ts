import { getStoryId, getStoryIdAll, getStorySelector, getStorySelectorAll } from '../../../.storybook/interaction-utils/storySelector'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { fireEvent } from '@storybook/testing-library'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'
import { sleep } from '@/utils/sleep'
import { VaSlider } from './'

function getSlider () {
  return {
    slider: getStoryId('slider').querySelector('[role="slider"]') as HTMLElement,
    sliderTrack: getStorySelector('.va-slider__track'),
    sliderThumb: getStorySelector('.va-slider__handler'),
  }
}

function getSliderAll () {
  return {
    slider: [...getStoryIdAll('slider')].map((el) => [...el.querySelectorAll('[role="slider"]')] as HTMLElement[]).flat(),
    sliderTrack: getStorySelectorAll('.va-slider__track:not([class*=" "])'),
    sliderThumb: getStorySelectorAll('.va-slider__handler'),
  }
}

async function dragThumbInAxis (element: HTMLElement, options: { clientX?: number, clientY?: number }) {
  const defaultOptions = { clientX: 0, clientY: 0 }
  const mergedOptions = { ...defaultOptions, ...options }
  const { clientX, clientY } = mergedOptions

  fireEvent.mouseDown(element)
  await sleep()
  fireEvent.mouseMove(element, { clientX, clientY })
  await sleep()
  fireEvent.mouseUp(element)
  await sleep()
}

function valueToClientX (slider: HTMLElement, element: HTMLElement, newValue: number) {
  const min = Number(slider.getAttribute('aria-valuemin'))
  const max = Number(slider.getAttribute('aria-valuemax'))

  const coordinate = element.getBoundingClientRect()

  return (element.clientWidth / (max - min)) * newValue + coordinate.x
}

function valueToClientY (slider: HTMLElement, element: HTMLElement, newValue: number) {
  const min = Number(slider.getAttribute('aria-valuemin'))
  const max = Number(slider.getAttribute('aria-valuemax'))

  const coordinate = element.getBoundingClientRect()

  return (Math.round(element.offsetHeight) / (max - min)) * newValue + Math.round(coordinate.y)
}

export default {
  title: 'VaSlider',
  component: VaSlider,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" data-testid="slider" />
  `,
})

Default.play = async ({ step }) => {
  const { slider, sliderTrack, sliderThumb } = getSlider()

  await step('Change value by clicking on the slider track', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 75)

    await userEvent.click(sliderTrack, { clientX })
    expect(slider).toHaveAttribute('aria-valuenow', '75')
  })

  await step('Change value through keyboard navigation', async () => {
    await userEvent.focus(sliderThumb)
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '76')

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '75')
  })

  await step('Change value by dragging the thumb', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 25)

    await dragThumbInAxis(sliderThumb, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', '25')
  })
}

export const Color: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" color="success" />
  `,
})

export const Disabled: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" disabled data-testid="slider" />
  `,
})

Disabled.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  await step('Does not change the value for disabled sliders (track)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 75)

    await userEvent.click(sliderTrack, { clientX, skipPointerEventsCheck: true })
    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })

  await step('Does not change the value for disabled sliders (keyboard)', async () => {
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '45')

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })

  await step('Does not change the value for disabled sliders (thumb)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 25)

    await dragThumbInAxis(sliderThumb, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })
}

export const Readonly: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" readonly data-testid="slider" />
  `,
})

Readonly.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  await step('Does not change the value for read-only sliders (track)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 75)

    await userEvent.click(sliderTrack, { clientX, skipPointerEventsCheck: true })
    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })

  await step('Does not change the value for read-only sliders (keyboard)', async () => {
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '45')

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })

  await step('Does not change the value for read-only sliders (thumb)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 25)

    await dragThumbInAxis(sliderThumb, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', '45')
  })
}

export const ShowTrack: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    [default]
    <VaSlider v-model="value" />
    [false]
    <VaSlider v-model="value" :show-track="false" />
  `,
})

export const Stateful: StoryFn = () => ({
  components: { VaSlider },
  template: `
    <VaSlider stateful data-testid="slider" />
  `,
})

Stateful.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  await step('Change value by clicking on the slider track', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 75)

    await userEvent.click(sliderTrack, { clientX })
    expect(slider).toHaveAttribute('aria-valuenow', '75')
  })

  await step('Change value through keyboard navigation', async () => {
    await userEvent.focus(sliderThumb)
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '76')

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '75')
  })

  await step('Change value by dragging the thumb', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 25)

    await dragThumbInAxis(sliderThumb, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', '25')
  })
}

export const Pins: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" pins />
  `,
})

export const Step: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :step="5" :label="value.toString()" data-testid="slider" />
  `,
})

Step.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  await step('Change value with a step of 5 (track)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 50)

    await userEvent.click(sliderTrack, { clientX })
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  await step('Change value with a step of 5 (keyboard)', async () => {
    await userEvent.focus(sliderThumb)
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '55')

    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  await step('Change value with a step of 5 (thumb)', async () => {
    const clientX = valueToClientX(slider, sliderTrack, 60)

    await dragThumbInAxis(sliderThumb, { clientX })
    expect(slider).toHaveAttribute('aria-valuenow', '60')
  })
}

export const IconAppend: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" icon-append="close" />
  `,
})

export const IconPrepend: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" icon-prepend="close" />
  `,
})

export const Label: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :label="value.toString()" />
  `,
})

export const LabelColor: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :label="value.toString()" label-color="success" />
  `,
})

export const InvertLabel: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :label="value.toString()" invert-label />
  `,
})

export const Min: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :min="15" :label="value.toString()" data-testid="slider" />
  `,
})

Min.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  const minValue = slider.getAttribute('aria-valuemin') as string
  const clientX = valueToClientX(slider, sliderTrack, 100)

  await step(`Minimum value must be ${minValue} (track)`, async () => {
    await userEvent.click(sliderTrack, { clientX })
    await userEvent.click(sliderTrack, { clientX: 0 })

    expect(slider).toHaveAttribute('aria-valuenow', minValue)
  })

  await step(`Minimum value must be ${minValue} (keyboard)`, async () => {
    fireEvent.keyDown(sliderThumb, { key: 'ArrowLeft' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', minValue)
  })

  await step(`Minimum value must be ${minValue} (thumb)`, async () => {
    await dragThumbInAxis(sliderThumb, { clientX })
    await dragThumbInAxis(sliderThumb, { clientX: 0 })

    expect(slider).toHaveAttribute('aria-valuenow', minValue)
  })
}

export const Max: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" :max="85" :label="value.toString()" invert-label data-testid="slider" />
  `,
})

Max.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSlider()

  const maxValue = slider.getAttribute('aria-valuemax') as string
  const clientX = valueToClientX(slider, sliderTrack, 100)

  await step(`Maximum value must be ${maxValue} (track)`, async () => {
    await userEvent.click(sliderTrack, { clientX: 0 })
    await userEvent.click(sliderTrack, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', maxValue)
  })

  await step(`Maximum value must be ${maxValue} (keyboard)`, async () => {
    fireEvent.keyDown(sliderThumb, { key: 'ArrowRight' })
    await sleep()

    expect(slider).toHaveAttribute('aria-valuenow', maxValue)
  })

  await step(`Maximum value must be ${maxValue} (thumb)`, async () => {
    await dragThumbInAxis(sliderThumb, { clientX: 0 })
    await dragThumbInAxis(sliderThumb, { clientX })

    expect(slider).toHaveAttribute('aria-valuenow', maxValue)
  })
}

export const CorrectRange: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 0 }),
  template: `
    <VaSlider v-model="value" :max="6" :min="0" :step="0.05" />
  `,
})

export const Range: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: [45, 65], minmaxValue: [45, 65] }),
  template: `
    [default]
    <div>
      <VaSlider v-model="value" range :label="value.toString()" data-testid="slider" />
    </div>
    [minmax]
    <div>
      <VaSlider v-model="minmaxValue" range :min="15" :max="85" :label="minmaxValue.toString()" data-testid="slider" />
    </div>
  `,
})

Range.play = async ({ step }) => {
  const { slider, sliderTrack } = getSliderAll()

  const clientX = valueToClientX(slider[0], sliderTrack[0], 100)

  await step('Must work on both sides (track)', async () => {
    await userEvent.click(sliderTrack[0], { clientX: 0 })
    await userEvent.click(sliderTrack[0], { clientX })

    expect(slider[0]).toHaveAttribute('aria-valuetext', '0')
    expect(slider[1]).toHaveAttribute('aria-valuetext', '100')
  })

  await step('Must work on both sides with min and max (track)', async () => {
    await userEvent.click(sliderTrack[1], { clientX: 0 })
    await userEvent.click(sliderTrack[1], { clientX })

    expect(slider[2]).toHaveAttribute('aria-valuetext', '15')
    expect(slider[3]).toHaveAttribute('aria-valuetext', '85')
  })
}

export const TrackColor: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" track-color="success" />
  `,
})

export const TrackLabelVisible: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" track-label-visible />
  `,
})

export const TrackLabel: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value" track-label-visible :track-label="'custom label ' + value" />
  `,
})

export const AppendSlot: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value">
      <template #append>
        [appendSlot]
      </template>
    </VaSlider>
  `,
})

export const PrependSlot: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value">
      <template #prepend>
        [prependSlot]
      </template>
    </VaSlider>
  `,
})

export const LabelSlot: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45 }),
  template: `
    <VaSlider v-model="value">
      <template #label>
        [labelSlot]
      </template>
    </VaSlider>
  `,
})

export const TrackLabelSlot: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45, valueRange: [45, 65] }),
  template: `
    [default]
    <div>
      <VaSlider v-model="value" track-label-visible>
        <template #trackLabel="{ value }">
          [trackLabelSlot {{ value }}]
        </template>
      </VaSlider>
    </div>
    [range]
    <div>
      <VaSlider v-model="valueRange" track-label-visible range>
        <template #trackLabel="{ value, order }">
          <p :style="{ color: order === 0 ? '#e42222' : '#3d9209' }">[trackLabelSlot {{ value }}]</p>
        </template>
      </VaSlider>
    </div>
  `,
})

export const ChangeEvent: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45, changedValue: 45 }),
  template: `
    <VaSlider v-model="value" @change="changedValue = value" data-testid="slider" />
    <p data-p>Changed value: {{ changedValue }}</p>
  `,
})

ChangeEvent.play = async ({ step }) => {
  const { slider, sliderTrack } = getSlider()
  const p = document.querySelector('[data-p]') as HTMLElement

  const clientX = valueToClientX(slider, sliderTrack, 100)

  await step('Fires change event', async () => {
    await userEvent.click(sliderTrack, { clientX })

    const currentValue = slider.getAttribute('aria-valuenow')

    expect(p).toHaveTextContent(`Changed value: ${currentValue}`)
  })
}

export const DragStartEvent: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45, start: false }),
  template: `
    <VaSlider v-model="value" @dragStart="start = true" @dragEnd="start = false" data-testid="slider" />
    <p v-if="start" data-p>Drag start!</p>
  `,
})

DragStartEvent.play = async ({ step }) => {
  const { sliderTrack } = getSlider()

  await step('Fires drag start event', async () => {
    fireEvent.mouseDown(sliderTrack)
    await sleep()

    let p = document.querySelector('[data-p]') as HTMLElement
    expect(p).toHaveTextContent('Drag start!')

    fireEvent.mouseUp(sliderTrack)
    await sleep()

    p = document.querySelector('[data-p]') as HTMLElement
    expect(p).toBeNull()
  })
}

export const DragEndEvent: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45, end: false }),
  template: `
    <VaSlider v-model="value" @dragEnd="end = true" @dragStart="end = false" data-testid="slider" />
    <p v-if="end" data-p>Drag end!</p>
  `,
})

DragEndEvent.play = async ({ step }) => {
  const { sliderTrack } = getSlider()

  await step('Fires drag end event', async () => {
    let p = document.querySelector('[data-p]') as HTMLElement
    expect(p).toBeNull()

    fireEvent.mouseDown(sliderTrack)
    await sleep()

    fireEvent.mouseUp(sliderTrack)
    await sleep()

    p = document.querySelector('[data-p]') as HTMLElement
    expect(p).toHaveTextContent('Drag end!')
  })
}

export const Vertical: StoryFn = () => ({
  components: { VaSlider },
  data: () => ({ value: 45, valuePins: 45, valueRange: [45, 65] }),
  template: `
    [default]
    <div style="height: 192px">
      <VaSlider v-model="value" vertical track-label-visible data-testid="slider" />
    </div>
    [pins]
    <div style="height: 192px">
      <VaSlider v-model="valuePins" vertical track-label-visible pins :step="5" data-testid="slider" />
    </div>
    [range]
    <div style="height: 192px" >
      <VaSlider v-model="valueRange" vertical track-label-visible range data-testid="slider" />
    </div>
  `,
})

Vertical.play = async ({ step }) => {
  const { slider, sliderThumb, sliderTrack } = getSliderAll()

  await sleep(500) // Wait when fonts are loaded

  await step('Change value by clicking on the slider track (vertical)', async () => {
    const clientY = valueToClientY(slider[0], sliderTrack[0], 50)

    await userEvent.click(sliderTrack[0], { clientY })

    expect(slider[0]).toHaveAttribute('aria-valuenow', '50')
  })

  await step('Change value through keyboard navigation (vertical)', async () => {
    await userEvent.focus(sliderThumb[0])
    fireEvent.keyDown(sliderThumb[0], { key: 'ArrowDown' })
    await sleep()

    expect(slider[0]).toHaveAttribute('aria-valuenow', '49')

    await userEvent.focus(sliderThumb[0])
    fireEvent.keyDown(sliderThumb[0], { key: 'ArrowUp' })
    await sleep()

    expect(slider[0]).toHaveAttribute('aria-valuenow', '50')
  })

  await step('Change value by dragging the thumb (vertical)', async () => {
    const clientY = valueToClientY(slider[0], sliderTrack[0], 10)

    await dragThumbInAxis(sliderThumb[0], { clientY })

    expect(slider[0]).toHaveAttribute('aria-valuenow', '90')
  })

  await step('Change value with a step of 5 (vertical keyboard)', async () => {
    await userEvent.focus(sliderThumb[1])
    fireEvent.keyDown(sliderThumb[1], { key: 'ArrowUp' })
    await sleep()

    expect(slider[1]).toHaveAttribute('aria-valuenow', '50')

    await userEvent.focus(sliderThumb[1])
    fireEvent.keyDown(sliderThumb[1], { key: 'ArrowDown' })
    await sleep()

    expect(slider[1]).toHaveAttribute('aria-valuenow', '45')
  })

  await step('Must work on both sides (vertical track)', async () => {
    const clientY = valueToClientY(slider[2], sliderTrack[2], 0)

    await userEvent.click(sliderTrack[2], { clientY })
    await userEvent.click(sliderTrack[2], { clientY: clientY + 168 })

    expect(slider[3]).toHaveAttribute('aria-valuetext', '0')
    expect(slider[2]).toHaveAttribute('aria-valuetext', '100')
  })
}
