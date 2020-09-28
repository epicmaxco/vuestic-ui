<template>
  <div>
    <button @click="$vaToast.init({ message: 'primary color', color: 'primary' })">primary</button>
    <button @click="$vaToast.init({ message: 'success color', color: 'success' })">success</button>
    <button @click="$vaToast.init({ message: 'danger color', color: 'danger' })">danger</button>
    <button @click="$vaToast.init({ message: 'warning color', color: 'warning' })">warning</button>
    <button @click="$vaToast.init({ message: '#5d0cf8 color', color: '#5d0cf8' })">#5d0cf8</button>
  </div>
</template>
