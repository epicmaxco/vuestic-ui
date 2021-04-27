<template>
  <div>
    <va-alert title="Title" class="mb-4">
      You read this important alert message.
    </va-alert>
    <va-alert class="mb-4">
      <template #title>
        Slotted title
      </template>
      You read this important alert message.
    </va-alert>
  </div>
</template>
