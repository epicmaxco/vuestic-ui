<template>
  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      true-inner-label="Agree"
      false-inner-label="Disagree"
    />
    <va-switch v-model="value">
      <template #innerLabel>
        Inner Label slot
      </template>
    </va-switch>
    <va-switch
      v-model="value"
      color="#5123a1"
      off-color="#ffd300"
      style="--va-switch-checker-background-color: #252723;"
    >
      <template #innerLabel>
        <div class="va-text-center">
          <va-icon
            size="24px"
            :name="value ? 'dark_mode' : 'light_mode'"
          />
        </div>
      </template>
    </va-switch>
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
