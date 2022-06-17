<template>
  <VbDemo>
    <VbCard title="Full gradient">
      <va-button-group gradient :color="value">
        <va-button>One</va-button>
        <va-button>Two</va-button>
        <va-button>Three</va-button>
      </va-button-group>
      <va-button-group gradient color="danger">
        <va-button>One</va-button>
        <va-button>
          Two
        </va-button>
        <va-button>Three</va-button>
      </va-button-group>
      <va-button-group gradient color="warning">
        <va-button>One</va-button>
        <va-button>Two</va-button>
        <va-button>Three</va-button>
      </va-button-group>
    </VbCard>

    <VbCard>
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th></th>
        </tr>
        <tr>
          <td>Group Types</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group>
                <va-button>Button 1</va-button>
                <va-button>Button 2</va-button>
                <va-button>Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Round Button Group">
              <va-button-group round>
                <va-button>Button 1</va-button>
                <va-button>Button 2</va-button>
                <va-button>Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Primary Button Group">
              <va-button-group>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 1</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 2</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 3</va-button>
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Round Primary Button Group">
              <va-button-group round>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 1</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 2</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 3</va-button>
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 1</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 2</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Button 3</va-button>
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Plain Button Group">
              <va-button-group plain border-color="primary">
                <va-button>
                  Button 1
                </va-button>
                <va-button>
                  Button 2
                </va-button>
                <va-button>
                  Button 3
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Group Sizes</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group size="small">
                <va-button>Small Button 1</va-button>
                <va-button>Small Button 2</va-button>
                <va-button>Small Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Primary Button Group">
              <va-button-group size="small">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 1</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 2</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 3</va-button>
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" size="small">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 1</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 2</va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>Small Button 3</va-button>
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Plain Button Group">
              <va-button-group plain border-color="primary" size="small">
                <va-button>
                  Small Button 1
                </va-button>
                <va-button>
                  Small Button 2
                </va-button>
                <va-button>
                  Small Button 3
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Icon Button Group</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group>
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Primary Button Group">
              <va-button-group>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="create" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add_circle_outline" />
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="create" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add_circle_outline" />
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Plain Button Group">
              <va-button-group plain border-color="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Icon Button Group Sizes</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group size="small">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Primary Button Group">
              <va-button-group size="small">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="create" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add_circle_outline" />
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" size="small">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="create" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add" />
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="add_circle_outline" />
                </va-config>
              </va-button-group>
            </VbCard>
            <VbCard title="Plain Button Group">
              <va-button-group plain border-color="primary" size="small">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Mixed Button Groups</td>
          <td>
            <VbCard>
              <va-button-group color="gray" style="margin-bottom: 1rem;">
                <va-button size="small" icon="create">
                  First
                </va-button>
                <va-button size="small" icon="clear">
                  Second
                </va-button>
                <va-button size="small" icon="block">
                  Third
                </va-button>
              </va-button-group>
              <va-button-group style="margin-bottom: 1rem;" color="dark">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>
                    One
                  </va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>
                    Two
                  </va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>
                    Three
                  </va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon="clear" />
                </va-config>
              </va-button-group>
              <va-button-group border-color="primary" color="info" style="margin-bottom: 1rem;">
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>
                    First
                  </va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button icon-right="create">
                    Second
                  </va-button>
                </va-config>
                <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
                  <va-button>
                    Third
                  </va-button>
                </va-config>
              </va-button-group>
              <va-button-group plain border-color="primary" style="margin-bottom: 1rem;" color="warning">
                <va-button icon="create" />
                <va-button icon="clear" />
                <va-button icon-right="block">
                  Update
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaButtonGroup } from './index'
import { VaButton } from '../va-button'
import { VaConfig } from '../va-config'

export default {
  components: {
    VaConfig,
    VaButton,
    VaButtonGroup,
  },
  data () {
    return {
      value: 'success',
      // temp
      vaButtonPresets: {
        primary: {
          backgroundOpacity: 0.1,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        secondary: {
          backgroundOpacity: 0,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        plain: {
          plain: true,
          hoverBehaviour: 'mask',
          hoverOpacity: 0.15,
          pressedBehaviour: 'mask',
          pressedOpacity: 0.13,
        },
        plainOpacity: {
          plain: true,
          textOpacity: 0.6,
          hoverBehaviour: 'opacity',
          hoverOpacity: 1,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.9,
        },
      },
    }
  },
}
</script>
