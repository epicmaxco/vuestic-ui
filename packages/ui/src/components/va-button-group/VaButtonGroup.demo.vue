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
              <va-button-group outline>
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
            <VbCard title="Flat Button Group">
              <va-button-group flat>
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
              <va-button-group outline>
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
              <va-button-group outline>
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
            <VbCard title="Flat Button Group">
              <va-button-group flat>
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
              <va-button-group>
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
              <va-button-group outline>
                <va-button icon="create" />
                <va-button icon="add" />
                <va-button icon="add_circle_outline" />
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group flat>
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
              <va-button-group color="primary">
                <va-button size="large" icon="create" />
                <va-button size="large" icon="add" />
                <va-button size="large" icon="add_circle_outline" />
                <va-button size="large" icon="face" />
              </va-button-group>
              <va-button-group color="success">
                <va-button size="small" icon="create" />
                <va-button size="small" icon="add" />
                <va-button size="small" icon="add_circle_outline" />
                <va-button size="small" icon="face" />
              </va-button-group>
            </VbCard>
            <VbCard title="Outline Button Group">
              <va-button-group outline>
                <va-button size="large" icon="create" />
                <va-button size="large" icon="add" />
                <va-button size="large" icon="add_circle_outline" />
                <va-button size="large" icon="face" />
              </va-button-group>
              <va-button-group outline>
                <va-button size="small" icon="create" />
                <va-button size="small" icon="add" />
                <va-button size="small" icon="add_circle_outline" />
                <va-button size="small" icon="face" />
              </va-button-group>
            </VbCard>
            <VbCard title="Flat Button Group">
              <va-button-group flat>
                <va-button size="large" icon="create" />
                <va-button size="large" icon="add" />
                <va-button size="large" icon="add_circle_outline" />
                <va-button size="large" icon="face" />
              </va-button-group>
              <va-button-group flat>
                <va-button size="small" icon="create" />
                <va-button size="small" icon="add" />
                <va-button size="small" icon="add_circle_outline" />
                <va-button size="small" icon="face" />
              </va-button-group>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Mixed Button Groups</td>
          <td>
            <VbCard>
              <va-button-group color="gray" flat>
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

              <va-button-group outline color="danger">
                <va-button  icon="create">
                  First
                </va-button>
                <va-button color="danger">
                  Second
                </va-button>
                <va-button color="danger">
                  Third
                </va-button>
              </va-button-group>

              <va-button-group flat color="warning">
                <va-button icon="create" />
                <va-button icon="clear" />
                <va-button icon-right="block">
                  Update
                </va-button>
              </va-button-group>

              <va-button-group color="dark">
                <va-button>
                  One
                </va-button>
                <va-button>
                  Two
                </va-button>
                <va-button>
                  Three
                </va-button>
                <va-button icon="clear" />
              </va-button-group>

              <va-button-group outline color="info">
                <va-button size="large">
                  First
                </va-button>
                <va-button
                  size="large"
                  icon-right="create"
                >
                  Second
                </va-button>
                <va-button size="large">
                  Third
                </va-button>
              </va-button-group>
            </VbCard>
          </td>
        </tr>
      </table>
    </VbCard>

    <VbCard title="Any shape">
      <va-button-group :rounded="false">
        <va-button>One</va-button>
        <va-button>Two</va-button>
        <va-button>Three</va-button>
      </va-button-group>
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
