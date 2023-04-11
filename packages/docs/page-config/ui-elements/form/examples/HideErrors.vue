<template>
  <va-form immediate hide-error-messages ref="myForm" class="flex flex-col gap-2 mb-2">
    <va-input
      label="Login"
      v-model="form.login"
      name="Login"
      :rules="[(v) => Boolean(v) || 'Login is required']"
    />
    <va-input
      label="Password"
      v-model="form.password"
      type="password"
      name="Password"
      :rules="[
        (v) => Boolean(v) || 'Password is required',
        (v) => v.length > 6 || 'Password must be a least 6 symbols',
      ]"
    />
  </va-form>

  <div v-for="errors, fieldName in errorMessagesNamed" :key="fieldName">
    <span class="va-title" v-if="errors.length > 0">{{ fieldName }}</span>
    <ul>
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vuestic-ui";

const form = reactive({
  login: "",
  password: "",
});

const { errorMessagesNamed } = useForm("myForm");
</script>
