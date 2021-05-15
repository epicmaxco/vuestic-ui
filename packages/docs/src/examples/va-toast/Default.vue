<template>
  <va-button class="mr-2 mb-2" @click="$vaToast.init('Hello')">Basic notification</va-button>
  <va-button @click="$vaToast.init('\<span style=\'font-weight: bold\'>Bold message</span>')">HTML code inside</va-button>
</template>
