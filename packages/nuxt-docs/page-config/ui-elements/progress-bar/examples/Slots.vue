<template>
  <div class="flex flex-col gap-2">
    <div>When you use a default slot:</div>
    <va-progress-bar :model-value="value">
      {{ value }}
    </va-progress-bar>

    <div>
      When you use a 'content-inside' prop:
    </div>
    <va-progress-bar :model-value="value" size="large" content-inside>
      {{ value }}
    </va-progress-bar>

    <div>
      When you use a 'show-percent' prop:
    </div>
    <va-progress-bar :model-value="value" show-percent />
    <va-progress-bar
      :model-value="value"
      size="1.5rem"
      color="warning"
      content-inside
      show-percent
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 75,
    };
  },
};
</script>
