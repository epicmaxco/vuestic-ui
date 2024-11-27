<template>
  <FormKit
    :type="types.checkbox"
    label="Terms and Conditions"
    help="Do you agree to our terms of service?"
    name="terms"
    :value="true"
    validation="accepted"
    validation-visibility="dirty"
  />
</template>

<script setup lang="ts">
import * as types from '@vuestic/formkit'
</script>
