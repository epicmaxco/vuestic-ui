<template>
  <VbDemo>
    <VbCard class="va-button-demo">
      <table class="table table-bordered">
        <tr>
          <td>Types</td>
          <td>
            <va-button>Accent (default)</va-button>
            <va-button preset="primary">Primary</va-button>
            <va-button preset="secondary">Secondary</va-button>
            <va-button preset="plain">Plain</va-button>
            <va-button preset="plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>
            Custom hover behaviour
          </td>
          <td>
            <va-button :backgroundOpacity="0.9" hoverBehaviour="opacity" :hoverOpacity="0.4">
              Hover me
            </va-button>
            <va-button preset="primary" hoverBehaviour="mask" hoverMaskColor="warning" :hoverOpacity="1">
              Hover me
            </va-button>
            <va-button preset="secondary" hoverBehaviour="opacity" :hoverOpacity="0.4">
              Hover me
            </va-button>
            <va-button preset="plain" hoverBehaviour="mask" hoverMaskColor="warning" :hoverOpacity="1">
              Hover me
            </va-button>
          </td>
        </tr>

        <tr>
          <td>
            Custom press behaviour
          </td>
          <td>
            <va-button :backgroundOpacity="0.9" pressedBehaviur="opacity" :hoverOpacity="0.4">
              Hover me
            </va-button>
            <va-button preset="primary" pressedBehavior="mask" :hoverOpacity="0.2">
              Hover me
            </va-button>
            <va-button preset="secondary" pressedBehavior="opacity" :hoverOpacity="0.4">
              Hover me
            </va-button>
            <va-button preset="plain" hoverBehaviour="mask" hoverMaskColor="warning" :hoverOpacity="1">
              Hover me
            </va-button>
          </td>
        </tr>

        <tr>
          <td>Small size</td>
          <td>
            <va-button size="small">Accent (default)</va-button>
            <va-button size="small" preset="primary">Primary</va-button>
            <va-button size="small" preset="secondary">Secondary</va-button>
            <va-button size="small" preset="plain">Plain</va-button>
            <va-button size="small" preset="plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>Large size</td>
          <td>
            <va-button size="large">Accent (default)</va-button>
            <va-button size="large" preset="primary">Primary</va-button>
            <va-button size="large" preset="secondary">Secondary</va-button>
            <va-button size="large" preset="plain">Plain</va-button>
            <va-button size="large" preset="plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>With icons</td>
          <td>
            <va-button icon="create">Edit Button</va-button>
            <va-button preset="secondary" icon="gavel" iconRight="clear">Mixed Button</va-button>
            <va-button preset="plainOpacity" icon="gavel">Plain with icon</va-button>
            <va-button preset="primary" size="small" icon="create">Small Edit Button</va-button>
            <va-button preset="primary" icon="gavel" icon-color="warning">Mixed Colors</va-button>
            <va-button preset="primary" icon-right="clear">Dropdown Button</va-button>
          </td>
        </tr>

        <tr>
          <td>Button Colors</td>
          <td>
            <va-button color="info">Info</va-button>
            <va-button preset="primary" color="danger">Danger</va-button>
            <va-button preset="secondary" color="warning">Warning</va-button>
            <va-button preset="plain" color="success">Success</va-button>
            <va-button preset="plainOpacity" color="textDark">Dark</va-button>
          </td>
        </tr>

        <tr>
          <td>Disabled state</td>
          <td>
            <va-button disabled>Accent (default)</va-button>
            <va-button preset="primary" disabled>Primary</va-button>
            <va-button preset="secondary" disabled>Secondary</va-button>
            <va-button preset="plain" disabled>Plain</va-button>
            <va-button preset="plainOpacity" disabled>Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>Button tags</td>
          <td>
            <va-button>Default</va-button>
            <va-button href="http://epic-spinners.epicmax.co/">A-link Button</va-button>
            <va-button to="/demo">Router-link Button</va-button>
          </td>
        </tr>

        <tr>
          <td>Buttons with icons (as slots with config)</td>
          <td>
            <va-config :components="{ VaIcon: { color: '#f00' } }">
              <va-button color="danger">
                <va-icon name="gavel" color="textLight" />
                Colored icons
                <va-icon name="shield" color="textLight" />
              </va-button>
              <va-button preset="plain" color="warning">
                <va-icon name="gavel" color="warning" />
                Colored icons
                <va-icon name="shield" color="warning" />
              </va-button>
            </va-config>
          </td>
        </tr>

        <tr>
          <td>Outline Buttons</td>
          <td>
            <va-button border-color="primary" preset="primary" icon="create">Secondary</va-button>
            <va-button border-color="primary" preset="secondary" iconRight="clear">Secondary</va-button>
            <va-button border-color="primary" preset="plain" icon="create" iconRight="clear">
              Secondary
            </va-button>
          </td>
        </tr>

        <tr>
          <td>Icons-only Buttons</td>
          <td>
            <va-button icon="block" />
            <va-button preset="primary" icon="block" />
            <va-button preset="secondary" icon="block" />
            <va-button preset="plain" icon="block" />
            <va-button preset="plainOpacity" icon="block" />
          </td>
        </tr>

        <tr>
          <td>
            Buttons with loading status
          </td>
          <td>
            <va-button :loading="buttonLoading" @click="buttonLoading = true">Start loading</va-button>
            <va-button preset="primary" :loading="buttonLoading" @click="buttonLoading = true">Start
              loading
            </va-button>
            <va-button @click="buttonLoading = false">Stop loading</va-button>
          </td>
        </tr>

        <tr>
          <td>
            Round button
          </td>
          <td>
            <va-button round>Label</va-button>
            <va-button round icon="block" />
            <va-button preset="primary" round icon="block" />
            <va-button preset="primary" border-color="warning" round>Label</va-button>
          </td>
        </tr>

        <tr>
          <td>
            Public methods (focus, blur)
          </td>
          <td>
            <va-button @click="$refs.testButton.focus()">Focus Main Button</va-button>
            <va-button ref="testButton">Main Button</va-button>
            <va-button @click="$refs.testButton.blur()">Blur Main Button</va-button>
          </td>
        </tr>

        <tr>
          <td>
            Multiline text
          </td>
          <td>
            <va-button style="width: 150px;">
              Default Button with long text
            </va-button>
            <va-button size="small" style="width: 150px;">
              Small Button with long text
            </va-button>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaIcon } from '../va-icon'
import { VaConfig } from '../va-config'
import { VaButton } from './index'

export default {
  components: { VaButton, VaIcon, VaConfig },
  data: () => ({
    buttonLoading: true,
  }),
}
</script>

<style lang="scss">
  .va-button-demo {
    & .va-button {
      margin-right: 16px;
    }

    & td {
      padding-top: 16px;
      display: flex;
      align-items: center;
    }
  }
</style>
