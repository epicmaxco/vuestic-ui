import { h, ref } from 'vue'
import { VaModal } from './'
import VaModalDemos from './VaModal.demo.vue'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'

import VaIcon from '../va-icon/VaIcon.vue'

export default {
  title: 'VaModal',
  component: VaModal,
  tags: ['autodocs'],
}

export const OldDemos: StoryFn = () => ({
  components: { VaModalDemos },
  template: '<VaModalDemos/>',
})

export const CloseButton: StoryFn = () => ({
  components: { VaModal },
  data () {
    return {
      show: false,
    }
  },
  template: `
    <button @click="show = true">
      show modal
    </button>
    <VaModal :model-value="show" @cancel="show = false" :close-button="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </VaModal>
  `,
})

export const focusTrap: StoryFn = () => ({
  components: { VaModal },

  data () {
    return {
      show: false,
    }
  },

  template: `
  <button @click="show = true">Focused button</button>
  <VaModal v-model="show">
    <input data-testid="input1" style="outline: 2px solid grey" />
    <input data-testid="input2" style="outline: 2px solid grey" />
    <input data-testid="input3" style="outline: 2px solid grey" />
  </VaModal>
  `,
})

focusTrap.play = async ({ canvasElement, step }) => {
  const showModalButton = canvasElement.querySelector('button')

  await userEvent.click(showModalButton!)

  const [input1, input2, input3] = Array.from(canvasElement.ownerDocument.querySelectorAll('input'))

  await step('Focus in modal after opened', async () => {
    const modal = canvasElement.ownerDocument.querySelector('.va-modal')

    await userEvent.tab()

    expect(modal?.contains(document.activeElement)).toBe(true)
  })

  await step('Item in input can be focused', async () => {
    await userEvent.focus(input2)

    expect(document.activeElement).toBe(input2)
  })

  // Notice we're not able to prevent programmatic focus from being out of focus trap
  // so we don't test it here, because userEvent.tab() will focus the next focusable element
  // programaticaly, not emulating user behavior
}

export const childProps: StoryFn = () => ({
  components: { VaModal },

  data () {
    return { color: '#f0f' }
  },

  setup () {
    const color = ref('#f0f')
    const textNode = h('div', { style: { color: 'red', fontSize: '18px' } }, 'Cancel')

    return { color, textNode }
  },

  template: `
  [[color]]: {{ color }}
  <VaModal :model-value="true" :child:cancel-button="{ 'slot:default': 'Text' }" :child:ok-button="{ preset: 'secondary' }">
    Content
  </VaModal>
  `,
})

// TODO: add tests
type PositionType = number | `${number}%`
type initialPositionType = { x?: PositionType; y?: PositionType }
export const DraggableAndAttachElement: StoryFn = () => ({
  components: { VaModal, VaIcon },
  setup () {
    const iconsList: {
      title: string;
      name: string;
      flip?: string;
      position: initialPositionType;
    }[] = [
      { title: 'Top Left', name: 'arrow_outward', flip: 'vertical', position: { x: 0, y: 0 } },
      { title: 'Top Center', name: 'arrow_upward', position: { x: '50%', y: 0 } },
      { title: 'Top Right', name: 'arrow_outward', position: { x: '100%', y: 0 } },
      { title: 'Center Left', name: 'arrow_back', position: { x: 0, y: '50%' } },
      { title: 'Center Center', name: 'circle', position: { x: '50%', y: '50%' } },
      { title: 'Center Right', name: 'arrow_forward', position: { x: '100%', y: '50%' } },
      { title: 'Bottom Left', name: 'arrow_outward', flip: 'both', position: { x: 0, y: '100%' } },
      { title: 'Bottom Center', name: 'arrow_downward', position: { x: '50%', y: '100%' } },
      { title: 'Bottom Right', name: 'arrow_outward', flip: 'horizontal', position: { x: '100%', y: '100%' } },
    ]

    const showModal = ref(false)
    const title = ref<string | null>(null)
    const initialPosition = ref<initialPositionType | null>(null)

    const handleIconClick = (currentTitle: string, position: initialPositionType) => {
      title.value = currentTitle
      initialPosition.value = position
      showModal.value = true
    }

    const iconsStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80px',
      gap: '4px',
      alignItems: 'Center',
    }

    const attachElementStyle = {
      width: '300px',
      height: '300px',
      border: '2px solid black',
    }

    return { iconsList, showModal, title, initialPosition, handleIconClick, iconsStyle, attachElementStyle }
  },
  template: `
    <div :style="iconsStyle">
      <VaIcon
        v-for="({ title, name, flip, position }, index) in iconsList"
        :key="index"
        :name="name"
        :flip="flip"
        size="large"
        @click="() => handleIconClick(title, position)"
      />
    </div>
  <div class="modal-attach-element" :style="attachElementStyle"/>
  <VaModal
    v-model="showModal"
    draggable
    :draggable-position="initialPosition"
    :title="title"
    attach-element=".modal-attach-element"
  >
    Lorem ipsum dolor sit amet.
  </VaModal>
  `,
})

export const DraggableSlots: StoryFn = () => ({
  components: { VaModal, VaIcon },
  template: `
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: 0, y: 0 }"
      title='Top Left position / "#Draggable" slot for drag'
    >
      <template #draggable={startDrag}>
        <span>
          <VaIcon
            name="drag_indicator"
            @mousedown="startDrag"
            :style="{cursor: 'move'}"
          />
        </span>
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '50%', y: 0 }"
    >
      Top Center position / "#Header" slot for drag
      <template #header={startDrag}>
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '100%', y: 0 }"
      title="Top Right position / Full window drag"
    >
      <template #footer>
        Footer slot
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: 0, y: '50%' }"
    >
    <template #header>
      Center Left position / Header slot / Full window drag
    </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '50%', y: '50%' }"
      title='Center Center position / "#Default" slot for drag'
    >
      <template #default={startDrag}>
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '100%', y: '50%' }"
    >
      <template #content={startDrag}>
        Center Right position / "#Content" slot for drag
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: 0, y: '100%' }"
      title="Bottom Left position / Full window drag"
    >
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '50%', y: '100%' }"
    >
      Bottom Center position /  "#Header" & "#Footer" slots for drag
      <template #header={startDrag}>
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
      <template #footer={startDrag}>
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
    </VaModal>
    <VaModal
      model-value="true"
      draggable
      :draggable-position="{ x: '100%', y: '100%' }"
      title='Bottom Right position / "#Footer" slot for drag'
    >
      <template #footer={startDrag}>
        <VaIcon
          name="drag_indicator"
          @mousedown="startDrag"
          :style="{cursor: 'move'}"
        />
      </template>
    </VaModal>
  `,
})
