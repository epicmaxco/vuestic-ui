<template>
  <div class="flex lg6 xs12">
    <div class="my-2 text--bold muted">small</div>
    <va-progress-bar
      size="small"
      :value="value"
    />
    <div class="my-2 text--bold muted">large</div>
    <va-progress-bar
      size="large"
      :value="value"
    />
    <div class="my-2 text--bold muted">25px</div>
    <va-progress-bar
      :size="25"
      :value="value"
    />
    <div class="my-2 text--bold muted">2rem</div>
    <va-progress-bar
      size="2rem"
      :value="value"
    />
  </div>
</template>
