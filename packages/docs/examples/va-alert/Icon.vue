<template>
  <div>
    <va-alert icon="info">
    You read this important alert message with an icon.
    </va-alert>
    <va-alert>
    <template #icon>
        <va-icon name="info"/>
    </template>
    You read this important alert message with a slotted icon.
    </va-alert>
  </div>
</template>
