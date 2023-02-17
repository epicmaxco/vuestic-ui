<template>
  <div class="flex flex-wrap gap-5">
    <va-card>
      <va-card-title>Between horizontal alignment</va-card-title>
      <va-card-actions align="between">
        <va-button>Action 1</va-button>
        <va-button>Action 2</va-button>
      </va-card-actions>
    </va-card>

    <va-card>
      <va-card-title>Stretch vertical alignment</va-card-title>
      <va-card-actions
        align="stretch"
        vertical
      >
        <va-button>Action 1</va-button>
        <va-button>Action 2</va-button>
      </va-card-actions>
    </va-card>
  </div>
</template>
