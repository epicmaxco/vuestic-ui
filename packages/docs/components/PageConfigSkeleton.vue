<template>
  <va-content
    v-show="doShow"
    class="va-skeleton page-config"
  >
    <h1 class="page-config-title short" /><br>
    <p class="two-lines long" />
    <br>
    <h3 class="page-config-subtitle medium" />
    <p class="three-lines short" />

    <va-card style="height: 150px; width: 100%;" />
    <h3 class="page-config-subtitle long" />
    <p class="medium" />

    <va-card style="height: 300px; width: 100%;" />
  </va-content>
</template>

<script lang="ts" setup>
const doShow = ref(false)

setTimeout(() => {
  doShow.value = true
}, 50)
</script>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    filter: brightness(0.8);
  }

  50% {
    filter: brightness(0.8);
  }

  100% {
    filter: brightness(1);
  }
}

.va-skeleton {
  & > * {
    --color: var(--va-background-element);
    --line-height: 1em;
    --height: var(--line-height);
    --width: 100%;
    --gap: 8px;

    overflow: hidden;
    position: relative;
    display: block;
    box-shadow: none;
    color: var(--color) !important;
    background: var(--color) !important;
    border-radius: 0;
    animation: fade 1s ease-in-out infinite alternate;
    width: var(--width);

    &::after {
      content: '';
      display: block;
      height: var(--height);
      width: 1px;
    }

    &.two-lines {
      --height: calc(2em);
    }

    &.three-lines {
      --height: calc(3em);
    }

    &.full {
      width: 100%;
    }

    &.short {
      --width: 160px;
    }

    &.medium {
      --width: 240px;
    }

    &.long {
      --width: 360px;
    }

    &:is(p) {
      position: relative;
      width: 100%;
      // Stripes background, so it looks like a lot of lines
      background:
        repeating-linear-gradient(
          0deg,
          var(--color),
          var(--color) calc(var(--line-height) - var(--gap) / 2),
          transparent calc(var(--line-height) - var(--gap) / 2),
          transparent var(--line-height),
        ) !important;
      background-position-y: calc(var(--gap) / -2);
      clip-path: polygon(0% 0%, 0% 100%, var(--width) 100%, var(--width) calc(100% - var(--line-height)), 100% calc(100% - var(--line-height)), 100% 100%, var(--line-height) 100%, var(--width) 100%, 100% 100%, 100% 0%);
    }
  }
}
</style>
