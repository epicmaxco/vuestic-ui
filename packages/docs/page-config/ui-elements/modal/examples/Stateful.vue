<template>
  <va-button @click="$refs.modal.show()">
    Show modal (stateful)
  </va-button>
  <va-modal
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
  </va-modal>
</template>
