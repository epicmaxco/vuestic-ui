<script setup lang="ts">
import * as types from '@vuestic/formkit'

type HTMLElementEvent<T = HTMLElement> = Event & {
  target: T;
}

const randomColor = (e: HTMLElementEvent) => {
  const hex = Math
    .floor(Math.random()*16777215)
    .toString(16);

  e.target!.setAttribute(
    'style',
    'background-color: #' + hex + '88;'
  )
}
</script>

<template>
  <div class="grid gap-6">
    <FormKit
      :type="types.button"
      color="danger"
      label="Checkout my label"
      help="You can use the label prop."
    />

    <FormKit
      :type="types.button"
      help="You can use the default slot."
      prefix-icon="check"
    >
      I have slot content
    </FormKit>

    <FormKit
      :type="types.button"
      help="You can bind event listeners."
      @click="randomColor"
    >
      Click me!
    </FormKit>
  </div>
</template>

