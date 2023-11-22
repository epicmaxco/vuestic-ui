<template>
  <VaButton @click="$refs.modal.show()">
    Show modal (stateful)
  </VaButton>
  <VaModal
    ref="modal"
    ok-text="Apply"
    stateful
  >
    <h3 class="va-h3">
      Title
    </h3>
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </VaModal>
</template>
