<template>
  <div>
    <va-button-group>
      <va-button outline>One</va-button>
      <va-button outline>Two</va-button>
      <va-button outline>Three</va-button>
    </va-button-group>

    <div class="mb-2" />

    <va-button-group>
      <va-button flat>One</va-button>
      <va-button flat>Two</va-button>
      <va-button flat>Three</va-button>
    </va-button-group>

    <div class="mb-2" />

    <va-button-group>
      <va-button :round="false">One</va-button>
      <va-button :round="false">Two</va-button>
      <va-button :round="false">Three</va-button>
    </va-button-group>
  </div>
</template>
