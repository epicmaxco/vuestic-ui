<template>
  <va-button class="mr-2 mb-2" @click="$vaToast.init({message: 'Top-right', position: 'top-right'})">top-right</va-button>
  <va-button class="mr-2 mb-2" @click="$vaToast.init({message: 'Top-left', position: 'top-left'})">top-left</va-button>
  <va-button class="mr-2 mb-2" @click="$vaToast.init({message: 'Bottom-right', position: 'bottom-right'})">bottom-right</va-button>
  <va-button class="mr-2 mb-2" @click="$vaToast.init({message: 'Bottom-left', position: 'bottom-left'})">bottom-left</va-button>
</template>
