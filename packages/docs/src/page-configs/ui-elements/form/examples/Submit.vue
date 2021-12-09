<template>
  <div>
    <va-form
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
    }
  },
  methods: {
    handleSubmit (e) {
      alert('-- form submit --')
    },
  },
}
</script>
