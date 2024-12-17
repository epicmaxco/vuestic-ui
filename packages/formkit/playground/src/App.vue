<script setup lang="ts">
import * as types from '../../src'
</script>

<template>
  <div class="p-5 w-lg">
    <div class="w-1/5 grid gap-6">
      <h2>Colorpicker</h2>
      <FormKit
        :type="types.colorpicker"
        value="#DE1B1B"
        label="A default colorpicker input"
        help="Just the way it comes out of the box."
        indicator="square"
      />
      <h2>Loading</h2>
      <FormKit
        :type="types.button"
        help="You can bind event listeners."
        :loading="true"
      >
        Click me!
      </FormKit>

      <h2>Color Example</h2>
      <FormKit
        :type="types.color"
        value="#00FF00"
        label="Select a color"
        help="Select your favorite color."
      />

      <h2>Basic Example</h2>
      <FormKit
        :type="types.text"
        label="Your username"
        value="calypso"
        help="Pick a username people will remember!"
        validation="required"
        validation-visibility="live"
        prefixIcon="check"
      />

      <h2>Cast to number</h2>
      <FormKit
        :type="types.text"
        label="Atmospheric pressure"
        name="pressure"
        validation="number"
        validation-visibility="live"
        help="My value will be a number if it can be parsed by parseFloat"
        value="29.82"
      />
    </div>
  </div>
</template>

