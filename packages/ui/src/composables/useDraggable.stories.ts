import { ref } from 'vue'
import { defineStory } from '../../.storybook/types'
import { useDraggable } from '../composables/useDraggable'

import { VaSwitch, VaButton, VaIcon } from '../components'

type PositionType = number | `${number}%`
type initialPositionType = { x?: PositionType; y?: PositionType }

export default {
  title: 'composables/useDraggable',
  tags: ['autodocs'],
}

// TODO: add tests
export const ScreenBoundary = defineStory({
  story: () => ({
    components: { VaSwitch },
    setup () {
      const draggableRef = ref<HTMLElement | null>(null)
      const isBoundary = ref(true)

      const { position, positionStyle, startDrag } = useDraggable({ draggableRef, isBoundary, initialPosition: { y: 100 } })

      const draggableStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }

      return { position, positionStyle, startDrag, draggableRef, isBoundary, draggableStyle }
    },
    template: `
        Screen Boundary
        <br />
        <VaSwitch
          v-model="isBoundary"
          true-inner-label="Agree"
          false-inner-label="Disagree"
        />
        <div ref="draggableRef" :style="[draggableStyle, positionStyle]" @mousedown="startDrag">
          Drag me!<br />x: {{ position.x }},<br />y: {{ position.y }}
        </div>
      </div>
    `,
  }),
})

export const DraggableIcon = defineStory({
  story: () => ({
    components: { VaIcon },
    setup () {
      const draggableRef = ref<HTMLElement | null>(null)
      const isBoundary = ref(true)

      const { position, positionStyle, startDrag } = useDraggable({ draggableRef, isBoundary, initialPosition: { x: '50%', y: '50%' } })

      const draggableStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }

      return { position, positionStyle, startDrag, draggableRef, isBoundary, draggableStyle }
    },
    template: `
      <div ref="draggableRef" :style="positionStyle">
          <VaIcon
            name="drag_indicator"
            @mousedown="startDrag"
            :style="{cursor: 'move'}"
          />
          <div :style="draggableStyle">
            Drag me!<br />x: {{ position.x }},<br />y: {{ position.y }}
          </div>
      </div>
    `,
  }),
})

export const ContainerBoundary = defineStory({
  story: () => ({
    components: { VaSwitch },
    setup () {
      const draggableRef = ref<HTMLElement | null>(null)
      const containerRef = ref<HTMLElement | null>(null)
      const isBoundary = ref(true)

      const { position, positionStyle, startDrag } = useDraggable({ draggableRef, containerRef, isBoundary })

      const containerStyle = {
        width: '200px',
        height: '200px',
        border: '2px solid black',
        margin: 'auto',
      }

      const draggableStyle = {
        width: '100px',
        height: '100px',
        backgroundColor: 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }

      return { position, positionStyle, startDrag, draggableRef, containerRef, isBoundary, draggableStyle, containerStyle }
    },
    template: `
      Boundary
      <br />
      <VaSwitch
        v-model="isBoundary"
        true-inner-label="Agree"
        false-inner-label="Disagree"
      />
      <div ref="containerRef" :style="containerStyle">
        <div
          ref="draggableRef"
          :style="[draggableStyle, positionStyle]"
          @mousedown="startDrag"
        >
          Drag me!<br />x: {{ position.x }},<br />y: {{ position.y }}
        </div>
      </div>
    `,
  }),
})

export const InitialPosition = defineStory({
  story: () => ({
    components: { VaIcon, VaButton },
    setup () {
      const iconsList: {
        name: string;
        flip?: string;
        position: initialPositionType;
      }[] = [
        { name: 'arrow_outward', flip: 'vertical', position: { x: 0, y: 0 } },
        { name: 'arrow_upward', position: { x: '50%', y: 0 } },
        { name: 'arrow_outward', position: { x: '100%', y: 0 } },
        { name: 'arrow_back', position: { x: 0, y: '50%' } },
        { name: 'circle', position: { x: '50%', y: '50%' } },
        { name: 'arrow_forward', position: { x: '100%', y: '50%' } },
        { name: 'arrow_outward', flip: 'both', position: { x: 0, y: '100%' } },
        { name: 'arrow_downward', position: { x: '50%', y: '100%' } },
        {
          name: 'arrow_outward',
          flip: 'horizontal',
          position: { x: '100%', y: '100%' },
        },
      ]

      const draggableRef = ref<HTMLElement | null>(null)
      const show = ref(false)
      const initialPosition = ref<initialPositionType>(iconsList[0].position)

      const { position, positionStyle, startDrag } = useDraggable({ draggableRef, initialPosition })

      const handleIconClick = (position: initialPositionType) => {
        initialPosition.value = position
        show.value = true
      }

      const draggableStyle = {
        width: '125px',
        height: '125px',
        backgroundColor: 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        flexDirection: 'column',
      }

      const iconsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80px',
        gap: '4px',
        alignItems: 'center',
      }

      return { iconsList, draggableRef, show, handleIconClick, position, positionStyle, startDrag, iconsStyle, draggableStyle }
    },
    template: `
      Initial Position
      <div :style="iconsStyle">
        <VaIcon
          v-for="({ name, flip, position }, index) in iconsList"
          :key="index"
          :name="name"
          :flip="flip"
          size="large"
          @click="() => handleIconClick(position)"
        />
      </div>
      <div
        v-if="show"
        ref="draggableRef"
        :style="[draggableStyle, positionStyle]"
        @mousedown="startDrag"
      >
        Drag me!<br />x: {{ position.x }},<br />y: {{ position.y }}<br />
        <VaButton @click="show = false">Hide</VaButton>
      </div>
    `,
  }),
})

export const DraggableState = defineStory({
  story: () => ({
    components: { VaButton, VaIcon, VaSwitch },
    setup () {
      const iconsList: {
        name: string;
        flip?: string;
        position: initialPositionType;
      }[] = [
        { name: 'arrow_outward', flip: 'vertical', position: { x: 0, y: 0 } },
        { name: 'arrow_upward', position: { x: '50%', y: 0 } },
        { name: 'arrow_outward', position: { x: '100%', y: 0 } },
        { name: 'arrow_back', position: { x: 0, y: '50%' } },
        { name: 'circle', position: { x: '50%', y: '50%' } },
        { name: 'arrow_forward', position: { x: '100%', y: '50%' } },
        { name: 'arrow_outward', flip: 'both', position: { x: 0, y: '100%' } },
        { name: 'arrow_downward', position: { x: '50%', y: '100%' } },
        {
          name: 'arrow_outward',
          flip: 'horizontal',
          position: { x: '100%', y: '100%' },
        },
      ]

      const containerRef = ref<HTMLElement | null>(null)
      const draggableRef = ref<HTMLElement | null>(null)
      const show = ref(true)
      const initialPosition = ref<initialPositionType>(iconsList[5].position)
      const isDraggable = ref(true)

      const { position, positionStyle, startDrag } = useDraggable({ draggableRef, containerRef, isDraggable, initialPosition })

      const handleIconClick = (position: initialPositionType) => {
        initialPosition.value = position
        show.value = true
      }

      const draggableStyle = {
        width: '125px',
        height: '125px',
        backgroundColor: 'gray',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        flexDirection: 'column',
      }

      const containerStyle = {
        width: '300px',
        height: '300px',
        border: '2px solid black',
        margin: 'auto',
      }

      const iconsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80px',
        gap: '4px',
        alignItems: 'center',
      }

      return { iconsList, containerRef, draggableRef, show, isDraggable, handleIconClick, position, positionStyle, startDrag, draggableStyle, containerStyle, iconsStyle }
    },
    template: `
      <div style="display: flex;">
        <div>
          Initial Position
          <div :style="iconsStyle">
            <VaIcon
              v-for="({ name, flip, position }, index) in iconsList"
              :key="index"
              :name="name"
              :flip="flip"
              size="large"
              @click="() => handleIconClick(position)"
            />
          </div>
          <br />
          Draggable state
          <br />
          <VaSwitch
            v-model="isDraggable"
            true-inner-label="Agree"
            false-inner-label="Disagree"
          />
        </div>
        <div ref="containerRef" :style="containerStyle">
          <div
            v-if="show"
            ref="draggableRef"
            :style="[draggableStyle, positionStyle]"
            @mousedown="startDrag"
          >
            Drag me!<br />x: {{ position.x }},<br />y: {{ position.y }}<br />
            <VaButton @click="show = false">Hide</VaButton>
          </div>
        </div>
      </div>
    `,
  }),
})
