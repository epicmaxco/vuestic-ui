<template>
  <va-card color="background" style="padding: 0.75rem;">
    <div class="d-flex" style="width: 100%;">
      <va-button>Button</va-button>
      <va-spacer />
      <va-button>Button</va-button>
    </div>
  </va-card>
</template>

<style>
  .spacer {
    text-align: center;
    border: 2px dashed #847979;
  }

  .spacer::after {
    content: "Va-Spacer is here!";
  }
</style>
