<template>
  <VbDemo>
    <VbCard title="Default">
      <va-card class="card">
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Dark">
      <va-card
        class="card"
        dark
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Square">
      <va-card
        class="card"
        square
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Outlined">
      <va-card
        class="card"
        outlined
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="W/o border and shadow">
      <va-card
        class="card"
        outlined
        :bordered="false"
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Disabled">
      <va-card
        class="card"
        disabled
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Custom tag">
      <va-card
        class="card"
        tag="span"
      >
        <va-card-title>Default card title</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="href, target, router-link">
      <va-card
        class="card"
        href="https://duckduckgo.com/"
        target="_blank"
      >
        <va-card-content>https://duckduckgo.com/</va-card-content>
      </va-card>
      <va-card
        class="card mt-1"
        :to="{path: '/'}"
      >
        <va-card-content>/</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="@click">
      <va-card
        class="card"
        @click="clicked += 1"
      >
        <va-card-content>Clicked: {{ clicked }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="colors">
      <div>
        <va-card
          class="card"
          color="#ff0000"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000"</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="#ff0000"
          dark
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000" dark</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="primary"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="primary"
          dark
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="primary" dark</va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="gradient colors">
      <div>
        <va-card
          class="card"
          color="#ff0000"
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000"</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="#ff0000"
          dark
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000" dark</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="primary"
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          color="primary"
          dark
          color-gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary" dark</va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="stripe">
      <div>
        <va-card
          class="card"
          stripe
          stripe-color="#ff0000"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>stripe stripeColor="#ff0000"</va-card-content>
        </va-card>
        <va-card
          class="card mt-1"
          stripe
          stripe-color="primary"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>stripe color="primary"</va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="From zeplin">
      <div class="flex">
        <div>
          <va-context :config="{VaCardTitle: {textColor: 'info'}}">
            <va-card
              class="card"
              stripe
              stripe-color="primary"
            >
              <va-card-title>Striped card</va-card-title>
              <va-card-content>Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the personal needs during their work hours as long as 80 minutes per day.</va-card-content>
              <va-card-content>
                <a href>Read full article</a>
              </va-card-content>
            </va-card>
          </va-context>
        </div>
        <va-context :config="{VaCardTitle: {textColor: 'info'}}">
          <va-card
            class="card ml-1"
            stripe
          >
            <va-image
              src="https://picsum.photos/400/200"
              style="height: 200px;"
            />
            <va-card-title>Card w image</va-card-title>
            <va-card-content>Company PC for the personal needs during their work hours.</va-card-content>
            <va-card-content>
              <va-button>Upload file</va-button>
            </va-card-content>
          </va-card>
        </va-context>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCard from './VaCard'
import VaCardTitle from './VaCardTitle'
import VaCardContent from './VaCardContent'
import VaButton from '../va-button/VaButton'
import VaImage from '../va-image/VaImage'
import VaContext from '../../context-test/context-provide/VaContext'

export default {
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaButton,
    VaImage,
    VaContext,
  },
  data () {
    return {
      clicked: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.card {
  width: 400px;
}

.mt-1 {
  margin-top: 1rem;
}

.ml-1 {
  margin-left: 1rem;
}
</style>
