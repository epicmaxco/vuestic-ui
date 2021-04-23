<template>
  <div>
    <va-button-group outline class="mb-4">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group flat class="mb-4">
      <va-button>One</va-button>
      <va-button>Two</va-button>
      <va-button>Three</va-button>
    </va-button-group>

    <va-button-group class="mb-4">
      <va-button :round="false">One</va-button>
      <va-button :round="false">Two</va-button>
      <va-button :round="false">Three</va-button>
    </va-button-group>
  </div>
</template>
