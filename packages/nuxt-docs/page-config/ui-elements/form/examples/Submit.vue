<template>
  <va-form
    style="width: 300px;"
    tag="form"
    @submit.prevent="handleSubmit"
  >
    <va-input
      label="Username"
      v-model="username"
    />

    <va-input
      class="mt-3"
      type="password"
      label="Password"
      v-model="password"
    />

    <va-select
      class="mt-3"
      label="Role"
      v-model="value"
      :options="options"
      clearable
    />

    <va-button type="submit" class="mt-3">
      Login
    </va-button>
  </va-form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      value: '',
      options: ['admin', 'user'],
    }
  },
  methods: {
    handleSubmit () {
      alert('-- form submit --')
    },
  },
}
</script>
