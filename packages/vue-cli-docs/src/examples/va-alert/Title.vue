<template>
  <div>
    <va-alert title="Title">
      You read this important alert message.
    </va-alert>
    <va-alert>
      <template v-slot:title>
        Slotted title
      </template>
      You read this important alert message.
    </va-alert>
  </div>
</template>
