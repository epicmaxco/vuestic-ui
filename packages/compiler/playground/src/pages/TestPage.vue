<script setup lang="ts">
import { ref } from 'vue'
import TestButton from './TestButton.vue'

const login = ref('')
const password = ref('')

const onLoginClick = () => {

}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <h3 class="va-h3">
        Login
      </h3>
      <div style="display: flex; flex-direction: column;">
        <VaInput
           v-model="login"
           label="Login"
        />
        <VaInput
           v-model="password"
           label="Password"
           type="password"
        />
      </div>
    </VaCardContent>
    <VaDivider style="margin: 0" />
    <VaCardActions>
      <TestButton>
        Test
      </TestButton>
      <TestButton @click="onLoginClick">
        Test 2
      </TestButton>
    </VaCardActions>
    <div
       v-for="i in 10"
       :key="i"
    >
      <span>
        {{ i }}
      </span>
    </div>
  </VaCard>
</template>
