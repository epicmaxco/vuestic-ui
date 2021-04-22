<template>
  <div>
    <va-button-group class="mb-4">
      <va-button outline>One</va-button>
      <va-button outline>Two</va-button>
      <va-button outline>Three</va-button>
    </va-button-group>

    <va-button-group class="mb-4">
      <va-button flat>One</va-button>
      <va-button flat>Two</va-button>
      <va-button flat>Three</va-button>
    </va-button-group>

    <va-button-group class="mb-4">
      <va-button :round="false">One</va-button>
      <va-button :round="false">Two</va-button>
      <va-button :round="false">Three</va-button>
    </va-button-group>
  </div>
</template>
