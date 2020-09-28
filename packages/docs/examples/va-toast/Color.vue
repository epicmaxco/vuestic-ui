<template>
  <div>
    <va-button @click="$vaToast.init({ message: 'primary color', color: 'primary' })">primary</va-button>
    <va-button @click="$vaToast.init({ message: 'success color', color: 'success' })">success</va-button>
    <va-button @click="$vaToast.init({ message: 'danger color', color: 'danger' })">danger</va-button>
    <va-button @click="$vaToast.init({ message: 'warning color', color: 'warning' })">warning</va-button>
    <va-button @click="$vaToast.init({ message: '#5d0cf8 color', color: '#5d0cf8' })">#5d0cf8</va-button>
  </div>
</template>
