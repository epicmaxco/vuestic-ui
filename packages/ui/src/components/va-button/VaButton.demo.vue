<template>
  <VbDemo>
    <VbCard class="va-button-demo">
      <table class="table table-bordered">
        <tbody>
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
            <td>Custom hover behavior</td>
            <td>
              <va-button hoverBehavior="opacity" :hoverOpacity="0.4">
                Hover me
              </va-button>
              <va-button
                preset="primary"
                hoverBehavior="mask"
                hoverMaskColor="warning"
                :hoverOpacity="1"
              >
                Hover me
              </va-button>
              <va-button
                preset="secondary"
                hoverBehavior="opacity"
                :hoverOpacity="0.4"
              >
                Hover me
              </va-button>
              <va-button
                preset="plain"
                hoverBehavior="mask"
                hoverMaskColor="warning"
                :hoverOpacity="1"
              >
                Hover me
              </va-button>
            </td>
          </tr>

          <tr>
            <td>Custom press behavior</td>
            <td>
              <va-button pressedBehavior="opacity" :pressedOpacity="0.4">
                Press me
              </va-button>
              <va-button
                preset="primary"
                pressedBehavior="mask"
                pressedMaskColor="warning"
              >
                Press me
              </va-button>
              <va-button
                preset="secondary"
                pressedBehavior="opacity"
                :pressedOpacity="0.4"
              >
                Press me
              </va-button>
              <va-button
                preset="plain"
                pressedBehavior="mask"
                pressedMaskColor="warning"
              >
                Press me
              </va-button>
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <va-button size="small">Labely</va-button>
              <va-button size="small" round>Labely</va-button>
              <va-button size="small" round icon="block"></va-button>
              <va-button size="small" round icon="block">Labely</va-button>
              <va-button size="small" round icon-right="block">Labely</va-button>
              <va-button size="small" round icon="block" icon-right="thumb_up"
                >Labely</va-button
              >
              <va-button
                size="small"
                round
                icon="block"
                icon-right="thumb_up"
                border-color="warning"
                >Labely</va-button
              >
            </td>
            <td>
              <va-button>Labely</va-button>
              <va-button round>Labely</va-button>
              <va-button round icon="block"></va-button>
              <va-button round icon="block">Labely</va-button>
              <va-button round icon-right="block">Labely</va-button>
              <va-button round icon="block" icon-right="thumb_up"
                >Labely</va-button
              >
              <va-button
                round
                icon="block"
                icon-right="thumb_up"
                border-color="warning"
                >Labely</va-button
              >
            </td>
          </tr>

          <tr>
            <td>
              <va-button size="large">Labely</va-button>
              <va-button size="large" round>Labely</va-button>
              <va-button size="large" round icon="block"></va-button>
              <va-button size="large" round icon="block">Labely</va-button>
              <va-button size="large" round icon-right="block">Labely</va-button>
              <va-button size="large" round icon="block" icon-right="thumb_up"
                >Labely</va-button
              >
              <va-button
                size="large"
                round
                icon="block"
                icon-right="thumb_up"
                border-color="warning"
                >Labely</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Small size</td>
            <td>
              <va-button size="small">Accent (default)</va-button>
              <va-button size="small" preset="primary">Primary</va-button>
              <va-button size="small" preset="secondary">Secondary</va-button>
              <va-button size="small" preset="plain">Plain</va-button>
              <va-button size="small" preset="plainOpacity"
                >Plain with opacity</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Large size</td>
            <td>
              <va-button size="large">Accent (default)</va-button>
              <va-button size="large" preset="primary">Primary</va-button>
              <va-button size="large" preset="secondary">Secondary</va-button>
              <va-button size="large" preset="plain">Plain</va-button>
              <va-button size="large" preset="plainOpacity"
                >Plain with opacity</va-button
              >
            </td>
          </tr>

          <tr>
            <td>With icons</td>
            <td>
              <va-button icon="create">Edit Button</va-button>
              <va-button preset="secondary" icon="gavel" iconRight="clear"
                >Mixed Button</va-button
              >
              <va-button preset="plainOpacity" icon="gavel"
                >Plain with icon</va-button
              >
              <va-button preset="primary" size="small" icon="create"
                >Small Edit Button</va-button
              >
              <va-button preset="primary" icon="gavel" icon-color="warning"
                >Mixed Colors</va-button
              >
              <va-button preset="primary" icon-right="clear"
                >Dropdown Button</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Button Colors</td>
            <td>
              <va-button color="info">Info</va-button>
              <va-button preset="primary" color="danger">Danger</va-button>
              <va-button preset="secondary" color="warning">Warning</va-button>
              <va-button preset="plain" color="success">Success</va-button>
              <va-button preset="plainOpacity" color="textPrimary"
                >Dark</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Disabled state</td>
            <td>
              <va-button disabled>Accent (default)</va-button>
              <va-button preset="primary" disabled>Primary</va-button>
              <va-button preset="secondary" disabled>Secondary</va-button>
              <va-button preset="plain" disabled>Plain</va-button>
              <va-button preset="plainOpacity" disabled
                >Plain with opacity</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Disabled state with popovers</td>
            <td>
              <va-popover message="Popover text">
                <va-button disabled>Accent (default)</va-button>
              </va-popover>
              <va-popover message="Popover text">
                <va-button preset="primary" disabled>Primary</va-button>
              </va-popover>
              <va-popover message="Popover text">
                <va-button preset="secondary" disabled>Secondary</va-button>
              </va-popover>
              <va-popover message="Popover text">
                <va-button preset="plain" disabled>Plain</va-button>
              </va-popover>
              <va-popover message="Popover text">
                <va-button preset="plainOpacity" disabled
                  >Plain with opacity</va-button
                >
              </va-popover>
            </td>
          </tr>

          <tr>
            <td>Button tags</td>
            <td>
              <va-button>Default</va-button>
              <va-button href="http://epic-spinners.epicmax.co/"
                >A-link Button</va-button
              >
              <va-button to="/demo">Router-link Button</va-button>
            </td>
          </tr>

          <tr>
            <td>Buttons with icons (as slots with config)</td>
            <td>
              <va-config :components="{ VaIcon: { color: '#f00' } }">
                <va-button color="danger">
                  <va-icon name="gavel" color="textInverted" />
                  Colored icons
                  <va-icon name="shield" color="textInverted" />
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
            <td>Border Color</td>
            <td>
              <va-button border-color="primary" :backgroundOpacity="0"
                >Button</va-button
              >
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
            <td>Buttons with loading status</td>
            <td>
              <va-button :loading="buttonLoading" @click="buttonLoading = true"
                >Start loading</va-button
              >
              <va-button
                preset="primary"
                :loading="buttonLoading"
                @click="buttonLoading = true"
                >Start loading
              </va-button>
              <va-button @click="buttonLoading = false">Stop loading</va-button>
            </td>
          </tr>

          <tr>
            <td>Round button</td>
            <td>
              <va-button round>Label</va-button>
              <va-button round icon="block" size="small" />
              <va-button round icon="block" />
              <va-button round icon="block" size="large" />
              <va-button preset="primary" round icon="block" />
              <va-button preset="secondary" round icon="block" />
              <va-button preset="primary" border-color="warning" round
                >Label</va-button
              >
              <va-button
                preset="primary"
                border-color="warning"
                round
                icon="block"
                >Label</va-button
              >
              <va-button round icon="thumb_up">Label</va-button>
            </td>
          </tr>

          <tr>
            <td>Public methods (focus, blur)</td>
            <td>
              <va-button @click="$refs.testButton.focus()"
                >Focus Main Button</va-button
              >
              <va-button ref="testButton">Main Button</va-button>
              <va-button @click="$refs.testButton.blur()"
                >Blur Main Button</va-button
              >
            </td>
          </tr>

          <tr>
            <td>Multiline text</td>
            <td>
              <va-button style="width: 150px;">
                Default Button with long text
              </va-button>
              <va-button size="small" style="width: 150px;">
                Small Button with long text
              </va-button>
            </td>
          </tr>

          <tr>
            <td>Slots</td>
            <td>
              <va-button icon-right="alarm" @click="isChecked = !isChecked">
                <template #prepend>
                  <VaCheckbox v-model="isChecked" color="secondary" readonly />
                </template>
                &nbsp; Button
              </va-button>
              <va-button>
                <template #prepend>prepend</template>
                LABEL
                <template #append>append</template>
              </va-button>
            </td>
          </tr>
        </tbody>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaIcon, VaCheckbox } from '../index'
import { VaConfig } from '../va-config'
import { VaButton } from './index'
import VaPopover from '../va-popover/VaPopover.vue'

export default {
  components: { VaButton, VaIcon, VaConfig, VaCheckbox, VaPopover },
  data: () => ({
    buttonLoading: true,
    isChecked: false,
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
