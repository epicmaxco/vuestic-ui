<template>
  <VbDemo>
    <VbCard title="Full gradient">
      <va-button-group :color="value">
        <va-button>One</va-button>
        <va-button>Two</va-button>
        <va-button>Three</va-button>
      </va-button-group>
      <va-button-group color="danger">
        <va-button>One</va-button>
        <va-button color="dark">
          Two
        </va-button>
        <va-button>Three</va-button>
      </va-button-group>
      <va-button-group color="warning">
        <va-button>One</va-button>
        <va-button>Two</va-button>
        <va-button>Three</va-button>
      </va-button-group>
    </VbCard>

    <VbCard>
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th>Va Button Group</th>
        </tr>
        <tr>
          <td>Default Button Group Types</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group>
                <va-button> Button 1</va-button>
                <va-button> Button 2</va-button>
                <va-button> Button 3</va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button outline>
                Button 1
              </va-button>
              <va-button-group>
                <va-button outline>
                  Button 1
                </va-button>
                <va-button outline>
                  Button 2
                </va-button>
                <va-button outline>
                  Button 3
                </va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group>
                <va-button flat>
                  Button 1
                </va-button>
                <va-button flat>
                  Button 2
                </va-button>
                <va-button flat>
                  Button 3
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Default Button Group Sizes</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group color="primary">
                <va-button size="large">
                  Button 1
                </va-button>
                <va-button size="large">
                  Button 2
                </va-button>
                <va-button size="large">
                  Button 3
                </va-button>
                <va-button size="large">
                  Button 4
                </va-button>
              </va-button-group>
              <va-button-group color="primary">
                <va-button size="small">
                  Button 1
                </va-button>
                <va-button size="small">
                  Button 2
                </va-button>
                <va-button size="small">
                  Button 3
                </va-button>
                <va-button size="small">
                  Button 4
                </va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group>
                <va-button
                  size="large"
                  outline
                >
                  Button 1
                </va-button>
                <va-button
                  size="large"
                  outline
                >
                  Button 2
                </va-button>
                <va-button
                  size="large"
                  outline
                >
                  Button 3
                </va-button>
                <va-button
                  size="large"
                  outline
                >
                  Button 4
                </va-button>
              </va-button-group>
              <va-button-group>
                <va-button
                  size="small"
                  outline
                >
                  Button 1
                </va-button>
                <va-button
                  size="small"
                  outline
                >
                  Button 2
                </va-button>
                <va-button
                  size="small"
                  outline
                >
                  Button 3
                </va-button>
                <va-button
                  size="small"
                  outline
                >
                  Button 4
                </va-button>
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group>
                <va-button
                  size="large"
                  flat
                >
                  Button 1
                </va-button>
                <va-button
                  size="large"
                  flat
                >
                  Button 2
                </va-button>
                <va-button
                  size="large"
                  flat
                >
                  Button 3
                </va-button>
                <va-button
                  size="large"
                  flat
                >
                  Button 4
                </va-button>
              </va-button-group>
              <va-button-group>
                <va-button
                  size="small"
                  flat
                >
                  Button 1
                </va-button>
                <va-button
                  size="small"
                  flat
                >
                  Button 2
                </va-button>
                <va-button
                  size="small"
                  flat
                >
                  Button 3
                </va-button>
                <va-button
                  size="small"
                  flat
                >
                  Button 4
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Icon Button Group</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group color="primary">
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group>
                <va-button
                  outline
                  icon="create"
                />
                <va-button
                  outline
                  icon="add"
                />
                <va-button
                  outline
                  icon="add_circle_outline"
                />
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group>
                <va-button
                  flat
                  icon="create"
                />
                <va-button
                  flat
                  icon="add"
                />
                <va-button
                  flat
                  icon="add_circle_outline"
                />
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Icon Button Group Sizes</td>
          <td>
            <VbCard title="Default Button Group">
              <va-button-group color="primary">
                <va-button
                  size="large"
                  icon="create"
                />
                <va-button
                  size="large"
                  icon="add"
                />
                <va-button
                  size="large"
                  icon="add_circle_outline"
                />
                <va-button
                  size="large"
                  icon="face"
                />
              </va-button-group>
              <va-button-group color="success">
                <va-button
                  size="small"
                  icon="create"
                />
                <va-button
                  size="small"
                  icon="add"
                />
                <va-button
                  size="small"
                  icon="add_circle_outline"
                />
                <va-button
                  size="small"
                  icon="face"
                />
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group>
                <va-button
                  size="large"
                  outline
                  icon="create"
                />
                <va-button
                  size="large"
                  outline
                  icon="add"
                />
                <va-button
                  size="large"
                  outline
                  icon="add_circle_outline"
                />
                <va-button
                  size="large"
                  outline
                  icon="face"
                />
              </va-button-group>
              <va-button-group>
                <va-button
                  size="small"
                  outline
                  icon="create"
                />
                <va-button
                  size="small"
                  outline
                  icon="add"
                />
                <va-button
                  size="small"
                  outline
                  icon="add_circle_outline"
                />
                <va-button
                  size="small"
                  outline
                  icon="face"
                />
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group>
                <va-button
                  size="large"
                  flat
                  icon="create"
                />
                <va-button
                  size="large"
                  flat
                  icon="add"
                />
                <va-button
                  size="large"
                  flat
                  icon="add_circle_outline"
                />
                <va-button
                  size="large"
                  flat
                  icon="face"
                />
              </va-button-group>
              <va-button-group>
                <va-button
                  size="small"
                  flat
                  icon="create"
                />
                <va-button
                  size="small"
                  flat
                  icon="add"
                />
                <va-button
                  size="small"
                  flat
                  icon="add_circle_outline"
                />
                <va-button
                  size="small"
                  flat
                  icon="face"
                />
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Mixed Button Groups</td>
          <td>
            <VbCard>
              <va-button-group>
                <va-button
                  flat
                  size="small"
                  color="gray"
                  icon="create"
                >
                  First
                </va-button>
                <va-button
                  flat
                  size="small"
                  color="gray"
                  icon="clear"
                >
                  Second
                </va-button>
                <va-button
                  flat
                  size="small"
                  color="gray"
                  icon="block"
                >
                  Third
                </va-button>
              </va-button-group>

              <va-button-group>
                <va-button
                  outline
                  color="danger"
                  icon="create"
                >
                  First
                </va-button>
                <va-button
                  outline
                  color="danger"
                >
                  Second
                </va-button>
                <va-button
                  outline
                  color="danger"
                >
                  Third
                </va-button>
              </va-button-group>

              <va-button-group>
                <va-button
                  flat
                  color="warning"
                  icon="create"
                />
                <va-button
                  flat
                  color="warning"
                  icon="clear"
                />
                <va-button
                  flat
                  color="warning"
                  icon-right="block"
                >
                  Update
                </va-button>
              </va-button-group>

              <va-button-group color="dark">
                <va-button color="dark">
                  One
                </va-button>
                <va-button color="dark">
                  Two
                </va-button>
                <va-button color="dark">
                  Three
                </va-button>
                <va-button
                  color="dark"
                  icon="clear"
                />
              </va-button-group>

              <va-button-group>
                <va-button
                  outline
                  size="large"
                  color="info"
                >
                  First
                </va-button>
                <va-button
                  outline
                  size="large"
                  color="info"
                  icon-right="create"
                >
                  Second
                </va-button>
                <va-button
                  outline
                  size="large"
                  color="info"
                >
                  Third
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

import VaButtonGroup from './index'
import VaButton from '../va-button'

export default {
  data () {
    return {
      value: 'success',
    }
  },
  components: {
    VaButton,
    VaButtonGroup,
  },
}
</script>
