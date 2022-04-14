<template>
  <VbDemo>
    <VbCard title="Default Class Helpers for text color">
      <div class="mb-4">
        <p class="va-text--danger">
          This is danger color
        </p>
        <p class="va-text--secondary">
          This is secondary color
        </p>
        <p class="va-text--success">
          This is success color
        </p>
        <p class="va-text--warning">
          This is warning color
        </p>
        <p class="va-text--primary">
          This is primary color
        </p>
        <p class="va-demo--gray">
          This is gray color
        </p>
        <p class="va-demo--dark">
          This is dark color
        </p>
      </div>
    </VbCard>

    <VbCard title="Default Class Helpers for background color">
      <div class="mb-4">
        <p class="va-bg--danger">
          This is danger background
        </p>
        <p class="va-bg--secondary">
          This is secondary background
        </p>
        <p class="va-bg--success">
          This is success background
        </p>
        <p class="va-bg--warning">
          This is warning background
        </p>
        <p class="va-bg--primary">
          This is primary background
        </p>
        <p class="va-bg--gray">
          This is gray background
        </p>
        <p class="va-bg--dark">
          This is dark background
        </p>
      </div>
    </VbCard>

    <VbCard title="Custom Class Helpers">
      <div class="mb-4">
        <a class="va-demo--danger">
          This is danger custom class
        </a>
        <a class="va-demo--secondary">
          This is secondary custom class
        </a>
        <a class="va-demo--success">
          This is success custom class
        </a>
        <a class="va-demo--warning">
          This is warning custom class
        </a>
        <a class="va-demo--primary">
          This is primary custom class
        </a>
        <a class="va-demo--gray">
          This is gray custom class
        </a>
        <a class="va-demo--dark">
          This is dark custom class
        </a>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
p,
a {
  padding: 0.75rem;
  margin-top: 0.5rem;
}

a {
  display: block;
  border: 1px solid;
}
</style>
