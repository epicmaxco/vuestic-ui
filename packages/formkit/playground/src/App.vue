<script lang="ts">
import { defineComponent } from 'vue';
import * as types from '../../src/main'

export default defineComponent({
  setup(props, ctx) {
    return {
      types
    }
  }
})

</script>

<template>
  <div
    v-for="type, typeName in types"
    :key="typeName"
    style="margin-bottom: 4rem;"
  >
    <p>{{ typeName }}</p>
    <FormKit
      v-if="type"
      :type="type"
      :label="typeName"
      validation="required|min:3"
      name="test"
      help="aaa"
    />
    <p v-else>
      null
    </p>
  </div>

  <FormKit
    :type="types.text"
    label="Test"
    validation="required|min:3"
    name="test"
    help="aaa"
  />
</template>

