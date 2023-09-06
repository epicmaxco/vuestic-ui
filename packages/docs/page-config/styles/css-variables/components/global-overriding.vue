<template>
  <div class="rounded-checkbox-demo py-2">
    <va-checkbox
      stateful
      label="Rounded checkbox"
      class="mb-2"
    />
    <va-input placeholder="Rounded input" />
  </div>
</template>

<style>
/* Do not override globally in demo to prevent docs bugs... */
.rounded-checkbox-demo {
  --va-checkbox-square-border-radius: 50%;
  --va-input-wrapper-border-radius: 99999px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
