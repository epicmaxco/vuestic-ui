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
    <VbCard title="Horizontal">
      <div class="d-flex">
        <div class="flex flex-col">
          <va-card class="mr-6" style="width: 400px;">
            <va-card-block horizontal>
              <va-image class="flex flex-col md6" src="https://picsum.photos/200/280" />
              <div class="flex flex-col md6">
                <va-card-title>Title</va-card-title>
                <va-card-content>
                  {{ lorem }}
                </va-card-content>
              </div>
            </va-card-block>
          </va-card>
        </div>
        <div class="flex flex-col">
          <va-card style="width: 300px;">
            <va-card-block horizontal>
              <va-image class="flex flex-col" style="flex: 1 0;" src="https://picsum.photos/250/250" />
              <va-card-actions class="flex flex-col" vertical align="center">
                <va-button icon="heart" size="small" color="success" plain />
                <va-button icon="bookmark" size="small" plain />
                <va-button icon="close" size="small" color="danger" plain />
              </va-card-actions>
            </va-card-block>
          </va-card>
        </div>
      </div>
    </VbCard>
    <VbCard title="From zeplin">
      <span title="Shouldn't be in demo. But should be fine to keep it in docs.">❗❗</span>
      <div style="display: flex;">
        <div>
          <va-config
            :components="{VaCard: {stripe: true, stripeColor: 'primary'}, VaCardTitle: {textColor: 'info'}}"
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
        <va-config :components="{VaCardTitle: {textColor: 'info'}}">
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
    <VbCard title="Actions - horizontal alignment and spaces for buttons">
      <div style="display: flex;">
        <va-card style="width: 400px;">
          <va-card-title>Default alignment (left)</va-card-title>
          <va-card-actions>
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
            <va-button>Action 3</va-button>
          </va-card-actions>
        </va-card>
        <va-card style="width: 400px; margin-left: 1rem;">
          <va-card-title>Center alignment</va-card-title>
          <va-card-actions align="center">
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
        <va-card style="width: 400px; margin-left: 1rem;">
          <va-card-title>Right alignment</va-card-title>
          <va-card-actions align="right">
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
      </div>
      <div style="display: flex; margin-top: 1rem;">
        <va-card style="width: 400px;">
          <va-card-title>Between alignment</va-card-title>
          <va-card-actions align="between">
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
        <va-card style="width: 400px; margin-left: 1rem;">
          <va-card-title>Around alignment</va-card-title>
          <va-card-actions align="around">
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
      </div>
    </VbCard>
    <VbCard title="Actions - vertical alignment">
      <div style="display: flex;">
        <va-card style="width: 400px;">
          <va-card-title>Default alignment (left)</va-card-title>
          <va-card-actions vertical>
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
            <va-button>Action 3</va-button>
          </va-card-actions>
        </va-card>
        <va-card style="width: 400px; margin-left: 1rem;">
          <va-card-title>Center alignment</va-card-title>
          <va-card-actions align="center" vertical>
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
        <va-card style="width: 400px; margin-left: 1rem;">
          <va-card-title>Right alignment</va-card-title>
          <va-card-actions align="right" vertical>
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
      </div>
      <div style="display: flex; margin-top: 1rem;">
        <va-card style="width: 400px;">
          <va-card-title>Stretch alignment</va-card-title>
          <va-card-actions align="stretch" vertical>
            <va-button>Action 1</va-button>
            <va-button>Action 2</va-button>
          </va-card-actions>
        </va-card>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaCard, VaCardContent, VaCardTitle, VaCardActions, VaCardBlock } from './index'
import { VaButton } from '../va-button'
import { VaImage } from '../va-image'
import { VaConfig } from '../va-config'

export default {
  components: {
    VaCard,
    VaCardTitle,
    VaCardContent,
    VaCardActions,
    VaButton,
    VaImage,
    VaConfig,
    VaCardBlock,
  },
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi massa, ultrices gravida blandit at, posuere ut nisi. Praesent auctor eros sit amet lobortis bibendum.',
      clicked: 0,
    }
  },
}
</script>
