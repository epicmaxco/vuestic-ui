# Storybook Guide

## Introduction

Welcome to our Storybook guide! This document is crafted to make it straightforward and clear for developers, to
understand the role of Storybook in our project and how to effectively write and use stories.

## Why Storybook Matters

Storybook is a key part of our development process, and here's why:

### Ensures Component Reliability

Think of Storybook as a testing ground. It lets us see how each UI component behaves individually, ensuring they work
correctly before integrating them into the larger application.

### Visual and Functional Consistency

Our UI library is constantly evolving. Storybook helps maintain a consistent look and feel across all components, even
as we add new features or make changes.

### Early Detection of Issues

Catching issues early in the development process is crucial. Storybook allows us to spot and fix problems before they
affect the larger system, saving time and effort.

### Facilitates Collaborative Development

With Storybook, developers can see how components are supposed to look and work, making it easier to collaborate and
contribute effectively to the project.

Tests Component-Specific Functionality

It's crucial to test the unique features and functionalities of each component. This ensures that the specific behaviors
that make each component valuable are preserved and work as intended.

## Conclusion

Our goal with Storybook is to make building and maintaining our UI library efficient and error-free. By following this
guide, you'll contribute to a more robust, consistent, and visually appealing UI library. Remember, clear and effective
stories make for a better development experience and a stronger product.

---
## Examples

### Example for "Ensures Component Reliability"

**Component**: `VaModal`

**Story**: `BaseFlows`

```ts

export const BaseFlows: StoryFn = () => ({
    components: {VaModal, VaButton},
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

BaseFlows.play = async ({canvasElement, step}) => {
    const canvas = within(canvasElement)
    // Open modal by clicking on trigger button `Show Modal`
    const openModal = () => userEvent.click(canvas.getByText('Show Modal'))

    const getModalElement = () => document.querySelector('.va-modal') as HTMLElement

    const waitUntilModalOpened = async () => {
        return waitFor(() => {
            if (!document.querySelector('.va-modal')) {
                throw new Error('Modal not loaded')
            }
        }, {timeout: 3000})
    }

    const waitUntilModalClosed = async () => waitFor(() => {
        // expect no modals to exist
        if (document.querySelectorAll('.va-modal').length === 0) {
            throw new Error('Modal not closed')
        }
    }, {timeout: 3000})

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
        userEvent.click(document.querySelector('.va-modal__close') as HTMLElement
        )
    })
}
```

**Description**: This story tests the basic functionality of the `VaModal` component. It ensures that the modal can open
and close correctly, serving as a fundamental test of the component's reliability.

---

### Example for "Visual and Functional Consistency"

**Component**: `VaModal`

**Story**: `MediumSize`

```ts
export const MediumSize: StoryFn = () => ({
    components: {VaModal, VaButton},
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
```

**Description**: Here, the story demonstrates the `VaModal` in its default medium size. This consistent visual
representation is crucial as the modal is used in various parts of the application, ensuring uniformity in appearance
and function.

---

### Example for "Early Detection of Issues"

**Component**: `VaModal`

**Story**: `Fullscreen`

```ts

export const Fullscreen: StoryFn = () => ({
    components: {VaModal, VaButton},
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
```

**Description**: This story highlights the `VaModal` in fullscreen mode, ensuring that it behaves as expected in this
particular state. It's important for detecting any issues that might occur in the fullscreen presentation.

---

### Example for "Facilitates Collaborative Development"

**Component**: `VaModal`

**Story**: `Nested`

```ts

export const Nested: StoryFn = () => ({
    components: {VaModal, VaButton},
    setup() {
        const showModalOuter = ref(false)
        const showModalInner = ref(false)
        return {showModalOuter, showModalInner}
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
        const childElement: HTMLElement | null = document.querySelector('.va-modal__overlay.va-modal__overlay--top')

        expect(childElement).toBeInTheDocument()

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
```

**Description**: This story demonstrates nested modals, a more complex use case. It is an excellent example for
developers to understand how to implement nested `VaModal` components and ensures that they can work collaboratively on
more advanced component integrations. Also, this example test a unique feature of `VaModal`
component (useModalLevel composable).

---

Each of these examples, with their descriptions, shows how Storybook plays a crucial role in different aspects of the
development and maintenance of your UI components.
