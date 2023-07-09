<template>
  <div class="flex flex-wrap gap-6 mb-6">
    <va-button-group>
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group preset="primary">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group preset="secondary">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>
  </div>

  <div class="flex flex-wrap gap-6 mb-6">
    <va-button-group preset="plain">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group preset="plainOpacity">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>
  </div>

  <div class="flex flex-wrap gap-6 mb-6">
    <va-button-group
      preset="secondary"
      border-color="primary"
    >
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group round>
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>
  </div>
</template>
