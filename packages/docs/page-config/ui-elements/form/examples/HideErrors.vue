<template>
  <VaForm ref="myForm" immediate hide-error-messages class="flex flex-col gap-2 mb-2">
    <VaInput
      v-model="form.login"
      label="Login"
      name="Login"
      :rules="[(v) => Boolean(v) || 'Login is required']"
    />
    <VaInput
      v-model="form.password"
      label="Password"
      type="password"
      name="Password"
      :rules="[
        (v) => Boolean(v) || 'Password is required',
        (v) => v.length > 6 || 'Password must be a least 6 symbols',
      ]"
    />
  </VaForm>

  <div v-for="errors, fieldName in errorMessagesNamed" :key="fieldName">
    <span v-if="errors.length > 0" class="va-title">{{ fieldName }}</span>
    <ul>
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vuestic-ui";

const form = reactive({
  login: "",
  password: "",
});

const { errorMessagesNamed } = useForm("myForm");
</script>
