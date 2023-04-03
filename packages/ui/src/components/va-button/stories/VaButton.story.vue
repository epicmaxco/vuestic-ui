<template>
  <Story title="va-button">
    <Variant title="color">
      <va-button color="info">Info</va-button>
      <va-button preset="primary" color="danger">Danger</va-button>
      <va-button preset="secondary" color="warning">Warning</va-button>
      <va-button preset="plain" color="success">Success</va-button>
      <va-button preset="plainOpacity" color="textPrimary">Dark</va-button>
    </Variant>
    <Variant title="disabled">
      <va-button disabled>Accent (default)</va-button>
      <va-button preset="primary" disabled>Primary</va-button>
      <va-button preset="secondary" disabled>Secondary</va-button>
      <va-button preset="plain" disabled>Plain</va-button>
      <va-button preset="plainOpacity" disabled>Plain with opacity</va-button>
    </Variant>
    <Variant title="hover behavior">
      <va-button :backgroundOpacity="0.9" hoverBehavior="opacity" :hoverOpacity="0.4">
        Hover me
      </va-button>
      <va-button preset="primary" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
        Hover me
      </va-button>
      <va-button preset="secondary" hoverBehavior="opacity" :hoverOpacity="0.4">
        Hover me
      </va-button>
      <va-button preset="plain" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
        Hover me
      </va-button>
    </Variant>
    <Variant title="icon to the side">
      <va-button icon="create">Edit Button</va-button>
      <va-button preset="secondary" icon="gavel" iconRight="clear">Mixed Button</va-button>
      <va-button preset="plainOpacity" icon="gavel">Plain with icon</va-button>
      <va-button preset="primary" size="small" icon="create">Small Edit Button</va-button>
      <va-button preset="primary" icon="gavel" icon-color="warning">Mixed Colors</va-button>
      <va-button preset="primary" icon-right="clear">Dropdown Button</va-button>
    </Variant>
    <Variant title="icon only">
      <va-button icon="block" />
      <va-button preset="primary" icon="block" />
      <va-button preset="secondary" icon="block" />
      <va-button preset="plain" icon="block" />
      <va-button preset="plainOpacity" icon="block" />
    </Variant>
    <Variant title="icons as slots in config">
      <va-button-icons-as-slots-in-config />
    </Variant>
    <Variant title="loading">
      <va-button-loading />
    </Variant>
    <Variant title="multiline-text">
      <va-button style="width: 150px;">
        Default Button with long text
      </va-button>
      <va-button size="small" style="width: 150px;">
        Small Button with long text
      </va-button>
    </Variant>
    <Variant title="outline">
      <va-button border-color="primary" preset="primary" icon="create">Secondary</va-button>
      <va-button border-color="primary" preset="secondary" iconRight="clear">Secondary</va-button>
      <va-button border-color="primary" preset="plain" icon="create" iconRight="clear">
        Secondary
      </va-button>
    </Variant>
    <Variant title="preset">
      <va-button>Accent (default)</va-button>
      <va-button preset="primary">Primary</va-button>
      <va-button preset="secondary">Secondary</va-button>
      <va-button preset="plain">Plain</va-button>
      <va-button preset="plainOpacity">Plain with opacity</va-button>
    </Variant>
    <Variant title="pressed behavior">
      <va-button :backgroundOpacity="0.9" hoverBehavior="opacity" :hoverOpacity="0.4">
        Hover me
      </va-button>
      <va-button preset="primary" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
        Hover me
      </va-button>
      <va-button preset="secondary" hoverBehavior="opacity" :hoverOpacity="0.4">
        Hover me
      </va-button>
      <va-button preset="plain" hoverBehavior="mask" hoverMaskColor="warning" :hoverOpacity="1">
        Hover me
      </va-button>
    </Variant>
    <Variant title="public methods">
      <va-button @click="$refs.testButton.focus()">Focus Main Button</va-button>
      <va-button ref="testButton">Main Button</va-button>
      <va-button @click="$refs.testButton.blur()">Blur Main Button</va-button>
    </Variant>
    <Variant title="round">
      <va-button round>Label</va-button>
      <va-button round icon="block" />
      <va-button preset="primary" round icon="block" />
      <va-button preset="primary" border-color="warning" round>Label</va-button>
    </Variant>
    <Variant title="size/small">
      <va-button size="small">Accent</va-button>
      <va-button size="small" preset="primary">Primary</va-button>
      <va-button size="small" preset="secondary">Secondary</va-button>
      <va-button size="small" preset="plain">Plain</va-button>
      <va-button size="small" preset="plainOpacity">Plain with opacity</va-button>
    </Variant>
    <Variant title="size/large">
      <va-button size="large">Accent (default)</va-button>
      <va-button size="large" preset="primary">Primary</va-button>
      <va-button size="large" preset="secondary">Secondary</va-button>
      <va-button size="large" preset="plain">Plain</va-button>
      <va-button size="large" preset="plainOpacity">Plain with opacity</va-button>
    </Variant>
    <Variant title="size">
      <va-button-slots />
    </Variant>
    <Variant title="tags">
      <va-button>Default</va-button>
      <va-button href="http://epic-spinners.epicmax.co/">A-link Button</va-button>
      <va-button to="/demo">Router-link Button</va-button>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { VaButton } from '../index'
import VaButtonIconsAsSlotsInConfig
  from './VaButton-icons-as-slots-in-config.vue'
import VaButtonLoading from './VaButton-loading.vue'
import VaButtonSlots from './VaButton-slots.vue'
</script>

<style scoped>
.va-button + .va-button {
  margin-left: 1rem;
  margin-bottom: 1rem;
}
</style>
