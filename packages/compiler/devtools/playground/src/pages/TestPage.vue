<script setup lang="ts">
import { ref } from 'vue'

const login = ref('')
const password = ref('')

const onLoginClick = () => {

}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <h3 class="va-h3">Login</h3>

      <div style="display: flex; flex-direction: column;">
        <VaInput v-model="login" label="Login" />

        <VaInput v-model="password" label="Password" type="password" />
      </div>
    </VaCardContent>
    <VaDivider style="margin: 0" />
    <VaCardActions>
      <VaButton @click="onLoginClick">
        Login
      </VaButton>
    </VaCardActions>
  </VaCard>
</template>
