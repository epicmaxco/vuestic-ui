<template>
  <VbDemo>
    <table style="width: 100%;">
      <tr>
        <td colspan="2">
          <VbCard title="Regular badges">
            <va-badge label="Paid" />
            <va-badge label="Success theme color" color="success" />
          </VbCard>
        </td>
        <td colspan="2">
          <VbCard title="Text color">
            <va-badge label="Default" />
            <va-badge label="Dark theme color" textColor="dark" />
          </VbCard>
        </td>
      </tr>
      <tr>
        <td>
          <VbCard title="Floated badges">
            <va-badge label="Regular">Float at</va-badge><br /><br />
            <va-badge label="Bottom" bottom>Float at</va-badge><br /><br />
            <va-badge label="Left" left>Float at</va-badge><br /><br />
            <va-badge label="Bottom+Left" bottom left>Float at</va-badge><br /><br />
            <va-badge label="icon"><va-icon name="face" /></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Slotted label">
            <va-badge label="I am Label">only label</va-badge><br /><br />
            <va-badge label="I am Badge"><template v-slot:badge>I am Badge</template>slotted badge</va-badge><br /><br />
            <va-badge label="I am Label"><template v-slot:badge>I am Badge</template>label + slotted badge</va-badge><br /><br />
            <va-badge label="I am Label"><template v-slot:badge><va-icon name="face" /></template>slotted icon</va-badge><br /><br />
            <va-badge label="I am Label"><template v-slot:badge><va-icon name="face" /></template><va-icon name="face" /></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="MultiLine badges">
            <va-badge><template v-slot:badge>Multi<br />Line</template>without multi-line prop</va-badge><br /><br />
            <va-badge multi-line><template v-slot:badge>Multi<br />Line</template>Multi line</va-badge><br /><br />
            <va-badge multi-line><template v-slot:badge>Multi<br />Line<br />more</template>Multi line</va-badge><br /><br />
            <div style="width: 500px; border: 2px solid green;">
              Regular non float badge
              <va-badge
                multi-line
                label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              /><br /><br />
            </div>
          </VbCard>
        </td>
        <td>
          <VbCard title="Dotted badges">
            <va-badge dot label="Regular">Regular</va-badge><br /><br />
            <va-badge dot label="Bottom" bottom>Bottom</va-badge><br /><br />
            <va-badge dot label="Left" left>Left</va-badge><br /><br />
            <va-badge dot label="Bottom+Left" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot label="Regular"><va-icon name="face" /></va-badge><br /><br />
          </VbCard>
        </td>
      </tr>
      <tr>
        <td>
          <VbCard title="Overlap badges">
            <va-badge overlap label="overlap">Regular</va-badge><br /><br />
            <va-badge overlap label="overlap" bottom>Bottom</va-badge><br /><br />
            <va-badge overlap label="overlap" left>Left</va-badge><br /><br />
            <va-badge overlap label="overlap" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge overlap label="1+"><va-icon name="face" /></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Overlap badges dot">
            <va-badge dot overlap label="dot overlap">Regular</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom>Bottom</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" left>Left</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot overlap label="icon"><va-icon name="face" /></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="VisibleEmpty">
            Empty: <va-badge /><br />
            Empty dot: <va-badge dot /><br />
            Empty with visibleEmpty prop: <va-badge visibleEmpty /><br />
            Dot with visibleEmpty prop: <va-badge visibleEmpty dot /><br />
            Not empty: <va-badge label="not empty" /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Transparent">
            Dot: <va-badge dot transparent /><br />
            Default: <va-badge label="label" transparent /><br />
            <br />
            Slotted: <va-badge label="label" transparent>content</va-badge><br />
          </VbCard>
        </td>
      </tr>
    </table>

    <VbCard title="transitions">
      <table>
        <tr>
          <td>
            Label: <input v-model="label"/><br />
            Dot: <input type="checkbox" v-model="dot"/><br />
            Transparent: <input type="checkbox" v-model="transparent"/><br />
            VisibleEmpty: <input type="checkbox" v-model="visibleEmpty"/><br />
            Left: <input type="checkbox" v-model="left"/><br />
            Bottom: <input type="checkbox" v-model="bottom"/><br />
            Overlap: <input type="checkbox" v-model="overlap"/><br />
          </td>
          <td>
            <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty">Default</va-badge><br />
            <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty"><div style="width: 100px; height: 100px; border: 2px solid green;">Custom<br />size</div></va-badge>
          </td>
        </tr>
      </table>
    </VbCard>

    <VbCard title="Interaction with components">
      <va-button>
        <va-badge label="10+">
          Button
        </va-badge>
      </va-button>
      <br />
      <br />
      <va-badge label="10+" overlap>
        <va-card>
          Overlap badge outside card
        </va-card>
      </va-badge>
      <br />
      <br />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'
import VaButton from '../va-button/VaButton'
import VaCard from '../va-card/VaCard'
import VaIcon from '../va-icon/VaIcon'

export default {
  components: { VaBadge, VaButton, VaCard, VaIcon },
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
