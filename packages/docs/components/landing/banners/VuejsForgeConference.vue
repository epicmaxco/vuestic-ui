<template>
  <div class="event-banner">
    <a
      href="https://vuejsforge.com/?utm_source=vuesticui&utm_medium=banner&utm_campaign=community"
      target="_blank"
      title="Vue.js forge conference"
    >
      <va-aspect-ratio
        :ratio="1600/72"
        :aria-hidden="true"
      >
        <img
          class="event-banner__img"
          src="/landing/forge-event-banner.png"
          alt=""
        >
      </va-aspect-ratio>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.event-banner {
  &__img {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
