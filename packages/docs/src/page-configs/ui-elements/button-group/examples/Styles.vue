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
      <va-button :rounded="false">One</va-button>
      <va-button :rounded="false">Two</va-button>
      <va-button :rounded="false">Three</va-button>
    </va-button-group>
  </div>
</template>
