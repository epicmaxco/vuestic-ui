<template>
  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      true-inner-label="Agree"
      false-inner-label="Disagree"
    />
    <VaSwitch v-model="value">
      <template #innerLabel>
        Inner Label slot
      </template>
    </VaSwitch>
    <VaSwitch
      v-model="value"
      color="#5123a1"
      off-color="#ffd300"
      style="--va-switch-checker-background-color: #252723;"
    >
      <template #innerLabel>
        <div class="va-text-center">
          <VaIcon
            :name="value ? 'dark_mode' : 'light_mode'"
          />
        </div>
      </template>
    </VaSwitch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
