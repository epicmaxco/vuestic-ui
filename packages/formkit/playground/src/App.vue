<script lang="ts">
import { defineComponent } from 'vue';
import * as types from '../../src'

export default defineComponent({
  setup() {
    return {
      types
    }
  }
})

</script>

<template>
  <div class="pa-4">
    <table class="va-table">
      <tbody>
      <tr
        v-for="(type, typeName) in types"
        :key="typeName"
      >
        <td>{{ typeName }}</td>
        <td>
          <FormKit
            v-if="type"
            :type="type"
            :label="typeName"
            validation="required|min:3"
            name="test"
            help="help"
          />
          <p v-else>
            null
          </p>
        </td>
      </tr>
      </tbody>
    </table>

    <FormKit
      :type="types.text"
      label="Test"
      validation="required|min:3"
      name="test"
      help="aaa"
    />
  </div>
</template>

