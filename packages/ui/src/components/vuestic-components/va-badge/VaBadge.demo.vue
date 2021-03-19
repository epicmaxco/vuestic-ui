<template>
  <VbDemo>
    <table style="width: 100%;">
      <tr>
        <td colspan="2">
          <VbCard title="Regular badges">
            <va-badge text="Paid" />
            <va-badge
              text="Success theme color"
              color="success"
            />
          </VbCard>
        </td>
        <td colspan="2">
          <VbCard title="Text color">
            <va-badge text="Default" />
            <va-badge
              text="Dark theme color"
              text-color="dark"
            />
          </VbCard>
        </td>
      </tr>
      <tr>
        <td>
          <VbCard title="Floated badges">
            <va-badge text="Regular">
              Float at
            </va-badge><br><br>
            <va-badge
              text="Bottom"
              bottom
            >
              Float at
            </va-badge><br><br>
            <va-badge
              text="Left"
              left
            >
              Float at
            </va-badge><br><br>
            <va-badge
              text="Bottom+Left"
              bottom
              left
            >
              Float at
            </va-badge><br><br>
            <va-badge text="icon">
              <va-icon name="face" />
            </va-badge><br><br>
          </VbCard>
        </td>
        <td>
          <VbCard title="Slotted label">
            <va-badge text="I am Label">
              <template #text>
                I am Badge
              </template>label + slotted badge
            </va-badge><br><br>
            <va-badge text="I am Label">
              <template #text>
                <va-icon name="face" />
              </template>slotted icon
            </va-badge><br><br>
            <va-badge text="I am Label">
              <template #text>
                <va-icon name="face" />
              </template><va-icon name="face" />
            </va-badge><br><br>
          </VbCard>
        </td>
        <td>
          <VbCard title="MultiLine badges">
            <va-badge>
              <template #text>
                Multi<br>Line
              </template>without multi-line prop
            </va-badge><br><br>
            <va-badge multi-line>
              <template #text>
                Multi<br>Line
              </template>Multi line
            </va-badge><br><br>
            <va-badge multi-line>
              <template #text>
                Multi<br>Line<br>more
              </template>Multi line
            </va-badge><br><br>
            <div style="width: 500px; border: 2px solid green;">
              Regular non float badge
              <va-badge
                multi-line
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              /><br><br>
            </div>
          </VbCard>
        </td>
        <td>
          <VbCard title="Dotted badges">
            <va-badge
              dot
              text="Regular"
            >
              Regular
            </va-badge><br><br>
            <va-badge
              dot
              text="Bottom"
              bottom
            >
              Bottom
            </va-badge><br><br>
            <va-badge
              dot
              text="Left"
              left
            >
              Left
            </va-badge><br><br>
            <va-badge
              dot
              text="Bottom+Left"
              bottom
              left
            >
              Bottom+Left
            </va-badge><br><br>
            <va-badge
              dot
              text="Regular"
            >
              <va-icon name="face" />
            </va-badge><br><br>
          </VbCard>
        </td>
      </tr>
      <tr>
        <td>
          <VbCard title="Overlap badges">
            <va-badge
              overlap
              text="overlap"
            >
              Regular
            </va-badge><br><br>
            <va-badge
              overlap
              text="overlap"
              bottom
            >
              Bottom
            </va-badge><br><br>
            <va-badge
              overlap
              text="overlap"
              left
            >
              Left
            </va-badge><br><br>
            <va-badge
              overlap
              text="overlap"
              bottom
              left
            >
              Bottom+Left
            </va-badge><br><br>
            <va-badge
              overlap
              text="1+"
            >
              <va-icon name="face" />
            </va-badge><br><br>
          </VbCard>
        </td>
        <td>
          <VbCard title="Overlap badges dot">
            <va-badge
              dot
              overlap
              text="dot overlap"
            >
              Regular
            </va-badge><br><br>
            <va-badge
              dot
              overlap
              text="dot overlap"
              bottom
            >
              Bottom
            </va-badge><br><br>
            <va-badge
              dot
              overlap
              text="dot overlap"
              left
            >
              Left
            </va-badge><br><br>
            <va-badge
              dot
              overlap
              text="dot overlap"
              bottom
              left
            >
              Bottom+Left
            </va-badge><br><br>
            <va-badge
              dot
              overlap
              text="icon"
            >
              <va-icon name="face" />
            </va-badge><br><br>
          </VbCard>
        </td>
        <td>
          <VbCard title="VisibleEmpty">
            Empty: <va-badge /><br>
            Empty dot: <va-badge dot /><br>
            Empty with visibleEmpty prop: <va-badge visible-empty /><br>
            Dot with visibleEmpty prop: <va-badge
              visible-empty
              dot
            /><br>
            Not empty: <va-badge text="not empty" /><br>
          </VbCard>
        </td>
        <td>
          <VbCard title="Transparent">
            Dot: <va-badge
              dot
              transparent
            /><br>
            Default: <va-badge
              text="label"
              transparent
            /><br>
            <br>
            Slotted: <va-badge
              text="label"
              transparent
            >
              content
            </va-badge><br>
          </VbCard>
        </td>
      </tr>
    </table>

    <VbCard title="transitions">
      <table>
        <tr>
          <td>
            Label: <input v-model="label"><br>
            Dot: <input
              type="checkbox"
              v-model="dot"
            ><br>
            Transparent: <input
              type="checkbox"
              v-model="transparent"
            ><br>
            VisibleEmpty: <input
              type="checkbox"
              v-model="visibleEmpty"
            ><br>
            Left: <input
              type="checkbox"
              v-model="left"
            ><br>
            Bottom: <input
              type="checkbox"
              v-model="bottom"
            ><br>
            Overlap: <input
              type="checkbox"
              v-model="overlap"
            ><br>
          </td>
          <td>
            <va-badge
              :transparent="transparent"
              :bottom="bottom"
              :left="left"
              :overlap="overlap"
              :text="label"
              :dot="dot"
              :visible-empty="visibleEmpty"
            >
              Default
            </va-badge><br>
            <va-badge
              :transparent="transparent"
              :bottom="bottom"
              :left="left"
              :overlap="overlap"
              :text="label"
              :dot="dot"
              :visible-empty="visibleEmpty"
            >
              <div style="width: 100px; height: 100px; border: 2px solid green;">
                Custom<br>size
              </div>
            </va-badge>
          </td>
        </tr>
      </table>
    </VbCard>

    <VbCard title="Interaction with components">
      <va-button>
        <va-badge text="10+">
          Button
        </va-badge>
      </va-button>
      <br>
      <br>
      <va-badge
        text="10+"
        overlap
      >
        <va-card>
          <va-card-content>
            Overlap badge outside card
          </va-card-content>
        </va-card>
      </va-badge>
      <br>
      <br>
    </VbCard>

    <BadgeAvatarDemo />
  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'
import VaButton from '../va-button'
import VaCard from '../va-card'
import VaCardContent from '../va-card/VaCardContent'
import VaIcon from '../va-icon/'
import BadgeAvatarDemo from './BadgeAvatarDemo'

export default {
  components: {
    BadgeAvatarDemo,
    VaBadge,
    VaButton,
    VaCard,
    VaCardContent,
    VaIcon,
  },
  data () {
    return {
      label: '1234',
      left: false,
      bottom: false,
      overlap: false,
      dot: false,
      transparent: false,
      visibleEmpty: false,
    }
  },
}
</script>
