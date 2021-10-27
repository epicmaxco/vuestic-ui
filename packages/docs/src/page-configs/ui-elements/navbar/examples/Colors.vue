<template>
  <va-navbar class="mb-2">
    <template #left>
      <va-navbar-item>LOGO HERE</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>Default color (secondary)</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Auto font color</va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar color="primary" class="mb-2">
    <template #left>
      <va-navbar-item>LOGO HERE</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>Primary</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Auto font color</va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar color="dark" class="mb-2">
    <template #left>
      <va-navbar-item>LOGO HERE</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>Dark</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Auto font color</va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar color="#ff00ff" class="mb-2">
    <template #left>
      <va-navbar-item>LOGO HERE</va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>#ff00ff</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Auto font color</va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar color="warning" text-color="dark" class="mb-2">
    <template #left>
      <va-navbar-item>Warning background</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Dark text color</va-navbar-item>
    </template>
  </va-navbar>

  <va-navbar color="dark" text-color="#cdcdcd" class="mb-2">
    <template #left>
      <va-navbar-item>Dark background</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>#cdcdcd text color</va-navbar-item>
    </template>
  </va-navbar>
</template>
