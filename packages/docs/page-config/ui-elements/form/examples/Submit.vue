<template>
  <VaForm
    class="w-[300px]"
    tag="form"
    @submit.prevent="handleSubmit"
  >
    <VaInput
      v-model="username"
      label="Username"
    />

    <VaInput
      v-model="password"
      class="mt-3"
      type="password"
      label="Password"
    />

    <VaSelect
      v-model="value"
      class="mt-3"
      label="Role"
      :options="options"
      clearable
    />

    <VaButton
      type="submit"
      class="mt-3"
    >
      Login
    </VaButton>
  </VaForm>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      value: "",
      options: ["admin", "user"],
    };
  },
  methods: {
    handleSubmit() {
      alert("-- form submit --");
    },
  },
};
</script>
