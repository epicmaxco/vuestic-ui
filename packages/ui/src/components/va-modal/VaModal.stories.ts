import { ref } from 'vue'
import { StoryFn } from '@storybook/vue3'
import { within, userEvent, waitFor, getByText } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import VaModal from './VaModal.vue'
import VaButton from '../va-button/VaButton.vue'

export default {
  title: 'VaModal',
  component: VaModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
  },
}

const playShowModal = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByText('Show Modal'))
}

const waitUntilModalOpened = async () => {
  return waitFor(() => {
    if (!document.querySelector('.va-modal')) {
      throw new Error('Modal not loaded')
    }
  }, { timeout: 3000 })
}

const waitUntilModalClosed = async () => waitFor(() => {
  // expect no modals to exist
  if (document.querySelectorAll('.va-modal').length === 0) {
    throw new Error('Modal not closed')
  }
}, { timeout: 3000 })

export const BaseFlows: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" close-button>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </VaModal>
  `,
})

BaseFlows.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  // Open modal by clicking on trigger button `Show Modal`
  const openModal = () => userEvent.click(canvas.getByText('Show Modal'))

  const getModalElement = () => document.querySelector('.va-modal') as HTMLElement

  await step('Close on `OK` button', async () => {
    openModal()

    await waitUntilModalOpened()

    // Click on `OK` button should close the modal. OK is a default submit button
    userEvent.click(getByText(getModalElement(), 'OK'))

    await waitUntilModalClosed()
  })

  await step('Close on `Cancel` button', async () => {
    openModal()

    await waitUntilModalOpened()

    // Click on `Cancel` button should close the modal. Cancel is a default cancel button
    userEvent.click(getByText(getModalElement(), 'Cancel'))
  })

  await step('Close on `Close` icon', async () => {
    openModal()

    await waitUntilModalOpened()

    // Click on `Close` icon should close the modal.
    userEvent.click(document.querySelector('.va-modal__close') as HTMLElement)
  })
}

// Modal Sizes Story
export const MediumSize: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal
      v-model="showModal"
      title="Medium Modal"
      size="medium"
    >
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </VaModal>
  `,
})
MediumSize.play = playShowModal

export const SmallSize: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal
      v-model="showModal"
      title="Small Modal"
      size="small"
    >
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </VaModal>
  `,
})
SmallSize.play = playShowModal

export const LargeSize: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal
      v-model="showModal"
      title="Large Modal"
      size="large"
    >
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </VaModal>
  `,
})
LargeSize.play = playShowModal

export const MaxWidth: StoryFn = () => ({
  components: { VaModal, VaButton },
  data () {
    return {
      showModal: false,
      maxWidth: '500px', // You can adjust this value as needed
    }
  },
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal
      v-model="showModal"
      title="Modal with Max Width"
      :max-width="maxWidth"
    >
      <p>This modal has a maximum width set to {{ maxWidth }}.</p>
    </VaModal>
  `,
})
MaxWidth.play = playShowModal

export const Stateful: StoryFn = () => ({
  components: { VaModal, VaButton },
  template: `
    <VaButton @click="$refs.modal.show()">
      Show Modal
    </VaButton>
    <VaModal
      ref="modal"
      stateful
    />
  `,
})
Stateful.play = playShowModal

export const Nested: StoryFn = () => ({
  components: { VaModal, VaButton },
  setup () {
    const showModalOuter = ref(false)
    const showModalInner = ref(false)
    return { showModalOuter, showModalInner }
  },
  template: `
    <VaButton @click="showModalOuter = true">Show Modal</VaButton>
    <VaModal v-model="showModalOuter" title="Outer Modal">
      <p>Outer modal content.
        <button @click="showModalInner = true">
          <b>Show Inner Modal</b>
        </button>
      </p>
      <VaModal v-model="showModalInner" title="Inner Modal">
        <p>Inner modal content.</p>
      </VaModal>
    </VaModal>
  `,
})
Nested.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  let rootLevelModal: HTMLElement
  let nestedLevelModal: HTMLElement

  await step('Open Root modal, first level', async () => {
    // Click on `Show Modal` trigger button, should open the modal.
    userEvent.click(canvas.getByText('Show Modal'))

    await waitUntilModalOpened()
    rootLevelModal = document.querySelector('.va-modal') as HTMLElement
  })

  await step('Open Nested modal, second level', async () => {
    // Click on `Show Inner Modal` button part of root modal content, should open the nested modal.
    userEvent.click(getByText(rootLevelModal, 'Show Inner Modal'))

    await waitFor(() => {
      // expect two modals to be loaded
      if (document.querySelectorAll('.va-modal').length === 2) {
        throw new Error('Nested modal not loaded')
      }
    }, { timeout: 3000 })

    // select top overlay(nested modal overlay)
    const childElement = document.querySelector('.va-modal__overlay.va-modal__overlay--top') as HTMLElement

    expect(childElement).toBeInTheDocument()

    if (!childElement.parentElement) {
      throw new Error('Nested modal not loaded')
    }

    nestedLevelModal = childElement.parentElement

    expect(nestedLevelModal).not.toEqual(rootLevelModal) // check if nested modal is not the same as root modal
    expect(nestedLevelModal.innerText.includes('Inner modal content.')) // check if nested modal content is correct
  })

  await step('Close Nested modal', async () => {
    // Click on `Cancel` button part of nested modal content, should close the nested modal.
    userEvent.click(getByText(nestedLevelModal, 'Cancel'))

    await waitFor(() => {
      // expect only root modal to exist
      if (document.querySelectorAll('.va-modal').length === 1) {
        throw new Error('Nested modal not closed')
      }
    }, { timeout: 3000 })
  })

  await step('Close Root modal', async () => {
    // Click on `Cancel` button part of root modal content, should close the root modal.
    userEvent.click(getByText(rootLevelModal as HTMLElement, 'Cancel'))

    await waitFor(() => {
      // expect no modals to exist
      if (document.querySelectorAll('.va-modal').length === 0) {
        throw new Error('Root modal not closed')
      }
    }, { timeout: 3000 })
  })
}

export const Fullscreen: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" fullscreen title="Fullscreen Modal">
      <template #header>
        <h3>Custom Header</h3>
      </template>
      <p>Fullscreen modal with a custom header.</p>
    </VaModal>
  `,
})
Fullscreen.play = playShowModal

export const MobileFullscreenModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" title="Mobile Fullscreen Modal" :mobile-fullscreen="true">
      <p>This modal is fullscreen on mobile devices.</p>
    </VaModal>
  `,
})
MobileFullscreenModal.play = playShowModal

export const HideDefaultActionsModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" title="Modal Without Default Actions" hide-default-actions>
      <p>This modal does not have default actions (OK/Cancel).</p>
    </VaModal>
  `,
})
HideDefaultActionsModal.play = playShowModal

export const CustomActionTextModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" title="Modal with Custom Action Text" ok-text="Agree" cancel-text="Dismiss">
      <p>This modal has custom action texts.</p>
    </VaModal>
  `,
})
CustomActionTextModal.play = playShowModal

export const AnchorSlotModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaModal v-model="showModal">
      <template #anchor="{ show }">
        <VaButton @click="show">Show Modal</VaButton>
      </template>
      <p>This modal uses the anchor slot for the show button.</p>
    </VaModal>
  `,
})
AnchorSlotModal.play = playShowModal

export const FooterSlotModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" title="Modal with Footer Slot">
      <template #footer>
        <div class="bg-blue-300">
          <p>Custom footer content.</p>
        </div>
      </template>
    </VaModal>
  `,
})
FooterSlotModal.play = playShowModal

export const HeaderSlotModal: StoryFn = () => ({
  components: { VaModal, VaButton },
  data: () => ({
    showModal: false,
  }),
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal v-model="showModal" title="Modal with Header Slot">
      <template #header>
        <div class="bg-yellow-300">
          <h3>Custom Header</h3>
        </div>
      </template>
      <p>This modal has a custom header.</p>
    </VaModal>
  `,
})
HeaderSlotModal.play = playShowModal

export const ModalWithMaxHeight: StoryFn = () => ({
  components: { VaModal, VaButton },
  data () {
    return {
      showModal: false,
      maxHeight: '300px',
    }
  },
  template: `
    <VaButton @click="showModal = true">Show Modal</VaButton>
    <VaModal
      v-model="showModal"
      title="Modal with Max Height"
      :max-height="maxHeight"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
      </p>
    </VaModal>
  `,
})
ModalWithMaxHeight.play = playShowModal
