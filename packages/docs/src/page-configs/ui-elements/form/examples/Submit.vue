<template>
  <div>
    <va-form
      style="width: 300px;"
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <va-input
        v-model="username"
        label="Username"
      />

      <va-input
        class="mt-2"
        v-model="password"
        type="password"
        label="Password"
      />

      <va-select
        class="mt-2"
        label="Role"
        v-model="value"
        :options="options"
        clearable
      />

      <va-button type="submit" class="mt-2">
        Login
      </va-button>
    </va-form>
  </div>
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
    handleSubmit (e) {
      alert('-- form submit --')
    },
  },
}
</script>
