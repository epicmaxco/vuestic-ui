<template>
  <div class="flex justify-center items-center h-screen">
    <VcCard class="w-96">
      <VcCardTitle>Login</VcCardTitle>
      <VcCardContent>
        <VcInput label="Username" class="mb-4 w-full" />
        <VcInput label="Password" type="password" class="mb-4 w-full" />
        <VcButton icon="person" class="w-full mb-2" color="primary">Sign In</VcButton>
        <VcButton class="w-full" color="secondary">Create new Account</VcButton>
      </VcCardContent>
    </VcCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const signIn = () => {
  console.log('Signing in with:', username.value, password.value);
};

const createAccount = () => {
  console.log('Redirecting to create account page');
};
</script>

<style scoped>
.va-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
