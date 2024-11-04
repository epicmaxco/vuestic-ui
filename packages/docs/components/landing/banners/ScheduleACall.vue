<template>
  <div class="event-banner">
    <h2 class="va-h3">
      Do You Need to <span class="va-text-warning">Migrate</span> Your Project to Vue 3?
    </h2>
    <p class="va-text max-w-[1000px] text-center">
      Schedule a free call with our CTO to discuss your specific project needs. We'll assess your current setup and help you make the best decision for your business. Let's get your app ready for the future!
    </p>
    <VaButton to="https://calendly.com/epicmax/30min" target="blank">
      Schedule a Call
    </VaButton>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.event-banner {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: color-mix(in srgb, var(--bg-partners) 80%, black 20%);
  color: var(--va-on-partners);
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}
</style>
