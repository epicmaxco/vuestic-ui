<template>
  <VbDemo>
    <VbCard title="Default">
      <va-card-new class="card">
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="Dark">
      <va-card-new
        class="card"
        dark
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="Square">
      <va-card-new
        class="card"
        square
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="Outlined">
      <va-card-new
        class="card"
        outlined
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="W/o border and shadow">
      <va-card-new
        class="card"
        outlined
        :bordered="false"
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="Disabled">
      <va-card-new
        class="card"
        disabled
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="Custom tag">
      <va-card-new
        class="card"
        tag="span"
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="href, target">
      <va-card-new
        class="card"
        href="https://duckduckgo.com/"
        target="_blank"
      >
        <va-card-content>https://duckduckgo.com/</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="router-link">
      <va-card-new
        class="card"
        :to="{path: '/'}"
      >
        <va-card-content>/</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="@click">
      <va-card-new
        class="card"
        @click="clicked += 1"
      >
        <va-card-content>Clicked: {{ clicked }}</va-card-content>
      </va-card-new>
    </VbCard>
    <VbCard title="gradient colors">
      <div>
        <va-card-new
          class="card"
          color="#ff0000"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="#ff0000"</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="#ff0000"
          dark
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="#ff0000" dark</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="primary"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="primary"
          dark
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary" dark</va-card-content>
        </va-card-new>
      </div>
    </VbCard>
    <VbCard title="colors">
      <div>
        <va-card-new
          class="card"
          color="#ff0000"
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="#ff0000"</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="#ff0000"
          dark
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="#ff0000" dark</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="primary"
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card-new>
        <va-card-new
          class="card mt-1"
          color="primary"
          dark
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary" dark</va-card-content>
        </va-card-new>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCardNew from './VaCardNew'
import VaCardTitle from './VaCardTitle'
import VaCardContent from './VaCardContent'

export default {
  components: {
    VaCardNew,
    VaCardTitle,
    VaCardContent,
  },
  data () {
    return {
      clicked: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
}

.mt-1 {
  margin-top: 1rem;
}
</style>
