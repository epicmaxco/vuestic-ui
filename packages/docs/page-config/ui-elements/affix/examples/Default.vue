<template>
  <div
    ref="target"
    class="h-72 overflow-y-scroll"
  >
    <p>
      {{ text }}
    </p>
    <VaAffix
      :offset-top="30"
      :offset-bottom="0"
      :target="() => $refs.target"
    >
      <div
        class="py-2.5 px-8 bg-[var(--va-background-element)]"
      >
        Custom target: top 30, bottom 0.
      </div>
    </VaAffix>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: Array(100)
        .fill(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        )
        .join(" "),
    };
  },
};
</script>
