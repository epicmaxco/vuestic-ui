<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="email"
      type="email"
      placeholder="hello@epicmax.co"
      label="Email"
    />
    <VaValue
      v-slot="isPasswordVisible"
      :default-value="false"
    >
      <VaInput
        v-model="password"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        label="Password with toggle"
        placeholder="#########"
        @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
            size="small"
            color="primary"
          />
        </template>
      </VaInput>
    </VaValue>
    <VaInput
      v-model="phone"
      type="tel"
      label="Phone number"
      placeholder="0 000 000 00 00"
    />
    <VaInput
      v-model="url"
      type="url"
      label="url"
      placeholder="https://ui.vuestic.dev"
    />
  </div>
</template>

<script>
export default {
  name: "Types",

  data: () => ({
    email: "",
    password: "",
    phone: "",
    search: "",
    url: "",
  }),
};
</script>
