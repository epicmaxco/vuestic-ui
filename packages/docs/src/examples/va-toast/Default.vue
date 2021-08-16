<template>
  <div>
    <va-button class="mr-2 mb-2" @click="$vaToast.init('Hello')">
      {{ $t('api.VaToast.examples.default.basic') }}
    </va-button>
    <va-button
      class="mb-2"
      @click="
        $vaToast.init('\<span style=\'font-weight: bold\'>Bold message</span>')
      "
    >
      {{ $t('api.VaToast.examples.default.html') }}
    </va-button>
  </div>
</template>
