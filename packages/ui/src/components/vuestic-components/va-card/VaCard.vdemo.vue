<template>
  <VbDemo>
    <VbCard title="Default">
      <va-card style="width: 400px;">
        <va-card-title>Title</va-card-title>
        <va-card-content />
      </va-card>
    </VbCard>
    <!-- TODO: check if this even works  -->
    <VbCard title="Dark">
      <va-card
        style="width: 400px;"
        dark
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>

    <VbCard title="Dark (Colored text)">
      <va-card
        style="width: 400px;"
        dark
      >
        <va-card-title textColor="primary">Title</va-card-title>
        <va-card-content textColor="info">{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>

    <VbCard title="Dark (Colored background)">
      <va-card
        style="width: 400px;"
        color="secondary"
        dark
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>

    <VbCard title="Square">
      <va-card
        style="width: 400px;"
        square
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Outlined">
      <va-card
        style="width: 400px;"
        outlined
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="No border and shadow">
      <span title="This solution looks kinda weird. Probably bordered: false should be enough.">❗❗</span>
      <va-card
        style="width: 400px;"
        outlined
        :bordered="false"
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Disabled">
      <va-card
        style="width: 400px;"
        disabled
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="Custom tag">
      <va-card
        style="width: 400px;"
        tag="span"
      >
        <va-card-title>Title</va-card-title>
        <va-card-content>{{ lorem }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="href, target, router-link">
      <va-card
        style="width: 400px;"
        href="https://duckduckgo.com/"
        target="_blank"
      >
        <va-card-content>https://duckduckgo.com/</va-card-content>
      </va-card>
      <va-card
        style="width: 400px; margin-top: 1rem;"
        :to="{path: '/'}"
      >
        <va-card-content>/</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="@click">
      <va-card
        style="width: 400px;"
        @click="clicked += 1"
      >
        <va-card-content>Clicked: {{ clicked }}</va-card-content>
      </va-card>
    </VbCard>
    <VbCard title="colors">
      <div>
        <va-card
          style="width: 400px;"
          color="#ff0000"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000"</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          color="#ff0000"
          dark
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000" dark</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          color="primary"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
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
          style="width: 400px;"
          color="#ff0000"
          gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000"</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          color="#ff0000"
          dark
          gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>color="#ff0000" dark</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          color="primary"
          gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary"</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          color="primary"
          dark
          gradient
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>:color="primary" dark</va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="stripe">
      <div>
        <va-card
          style="width: 400px;"
          stripe
          stripe-color="#ff0000"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>stripe stripeColor="#ff0000"</va-card-content>
        </va-card>
        <va-card
          style="width: 400px; margin-top: 1rem;"
          stripe
          stripe-color="primary"
        >
          <va-card-title>Title</va-card-title>
          <va-card-content>stripe color="primary"</va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="Dropdown">
      <div>
        <va-card
          style="width: 400px; margin-top: 1rem;"
        >
          <va-card-content>
            There should be a yellow square somewhere in the bottom right. His name is fake dropdown.
            <div style="position: absolute; top: 100%; left: 100%; background: yellow; z-index: 10000">
              Im fake dropdown. I have to be outside the card.
            </div>
          </va-card-content>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="From zeplin">
      <span title="Shouldn't be in demo. But should be fine to keep it in docs.">❗❗</span>
      <div style="display: flex;">
        <div>
          <va-config
            :config="{VaCard: {stripe: true, stripeColor: 'primary'}, VaCardTitle: {textColor: 'info'}}"
          >
            <va-card style="width: 400px;">
              <va-card-title>Striped card</va-card-title>
              <va-card-content>{{ lorem }}</va-card-content>
              <va-card-content>
                <a href>Read full article</a>
              </va-card-content>
            </va-card>
          </va-config>
        </div>
        <va-config :config="{VaCardTitle: {textColor: 'info'}}">
          <va-card style="width: 400px; margin-left: 1rem;">
            <va-image
              src="https://picsum.photos/400/200"
              style="height: 200px;"
            />
            <va-card-title>Card w image</va-card-title>
            <va-card-content>{{ lorem }}</va-card-content>
            <va-card-content>
              <va-button>Upload file</va-button>
            </va-card-content>
          </va-card>
        </va-config>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCard, { VaCardContent, VaCardTitle } from './index'
import VaButton from '../va-button'
import VaImage from '../va-image'
import VaConfig from '../va-config'

export default {
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaButton,
    VaImage,
    VaConfig,
  },
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.',
      clicked: 0,
    }
  },
}
</script>
