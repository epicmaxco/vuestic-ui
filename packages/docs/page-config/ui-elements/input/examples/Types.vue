<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-input
      v-model="email"
      type="email"
      label="Email"
    />
    <va-value
      v-slot="isPasswordVisible"
      :default-value="false"
    >
      <va-input
        v-model="password"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        label="Password with toggle"
        @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <va-icon
            :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
            size="small"
            color="primary"
          />
        </template>
      </va-input>
    </va-value>
    <va-input
      v-model="phone"
      type="tel"
      label="Phone number"
    />
    <va-input
      v-model="url"
      type="url"
      label="url"
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
