<template>
  <div>
    <va-alert color="warning" icon="info" class="mb-4">
    You read this important alert message with an icon.
    </va-alert>
    <va-alert color="info" class="mb-4">
    <template #icon>
        <va-icon name="info" />
    </template>
    You read this important alert message with a slotted icon.
    </va-alert>
  </div>
</template>
