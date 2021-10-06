<template>
  <va-time-input v-model="value" manual-input />
  <va-divider />
  <va-time-input v-model="value" manual-input :parseTime="parseFn" />
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      parseFn: (text) => {
        if (!/[0-9]{1,2}/g.test(text)) { return null }

        const d = new Date(); d.setHours(text); return d
      },
    }
  },
}
</script>
