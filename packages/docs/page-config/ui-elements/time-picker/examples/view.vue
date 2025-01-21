<template>
  <h6>
    {{ value.getHours() }}:{{ value.getMinutes() }}:{{ value.getSeconds() }}
  </h6>

  <table>
    <tbody>
      <tr>
        <td>Hours</td>
        <td>Minutes</td>
        <td>Seconds</td>
      </tr>
      <tr>
        <td>
          <VaTimePicker
            v-model="value"
            view="hours"
          />
        </td>
        <td>
          <VaTimePicker
            v-model="value"
            view="minutes"
          />
        </td>
        <td>
          <VaTimePicker
            v-model="value"
            view="seconds"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
