<template>
  <VbDemo class="va-button-group-demo">
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
              <va-button-group preset="primary">
                <va-button>Button 1</va-button>
                <va-button>Button 2</va-button>
                <va-button>Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Round Primary Button Group">
              <va-button-group round preset="primary">
                <va-button>Button 1</va-button>
                <va-button>Button 2</va-button>
                <va-button>Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" preset="primary">
                <va-button>Button 1</va-button>
                <va-button>Button 2</va-button>
                <va-button>Button 3</va-button>
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

              <va-button-group size="large">
                <va-button>Large Button 1</va-button>
                <va-button>Large Button 2</va-button>
                <va-button>Large Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Primary Button Group">
              <va-button-group size="small" preset="primary">
                <va-button>Small Button 1</va-button>
                <va-button>Small Button 2</va-button>
                <va-button>Small Button 3</va-button>
              </va-button-group>

              <va-button-group size="large" preset="primary">
                <va-button>Large Button 1</va-button>
                <va-button>Large Button 2</va-button>
                <va-button>Large Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" size="small" preset="primary">
                <va-button>Small Button 1</va-button>
                <va-button>Small Button 2</va-button>
                <va-button>Small Button 3</va-button>
              </va-button-group>

              <va-button-group border-color="primary" size="large" preset="primary">
                <va-button>Large Button 1</va-button>
                <va-button>Large Button 2</va-button>
                <va-button>Large Button 3</va-button>
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

              <va-button-group plain border-color="primary" size="large">
                <va-button>
                  Large Button 1
                </va-button>
                <va-button>
                  Large Button 2
                </va-button>
                <va-button>
                  Large Button 3
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
              <va-button-group preset="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" preset="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
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
              <va-button-group size="small" preset="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group border-color="primary" size="small" preset="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
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
              <va-button-group color="secondary">
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
              <va-button-group color="textPrimary" preset="primary">
                <va-button>One</va-button>
                <va-button>Two</va-button>
                <va-button>Three</va-button>
                <va-button icon="clear" />
              </va-button-group>
              <va-button-group border-color="primary" color="info" preset="primary">
                <va-button>First</va-button>
                <va-button icon-right="create">Second</va-button>
                <va-button>Third</va-button>
              </va-button-group>
              <va-button-group plain border-color="primary" color="warning">
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
import { VaButton } from '../va-button'
import { VaButtonGroup } from './index'

export default {
  components: {
    VaButton,
    VaButtonGroup,
  },
  data: () => ({
    value: 'success',
  }),
}
</script>

<style lang="scss">
.va-button-group-demo {
  .va-button-group {
    margin-bottom: 16px;
  }
}
</style>
