<template>
  <VbDemo>
    <table style="width: 100%">
      <tr>
        <td colspan="2">
          <VbCard title="Regular badges">
            <va-badge label="Paid" />
            <va-badge label="Info" color="info" />
            <va-badge label="Danger" color="danger" />
            <va-badge label="Warning" color="warning" />
            <va-badge label="gray" color="gray" />
            <va-badge label="dark" color="dark" />
          </VbCard>
        </td>
        <td colspan="2">
          <VbCard title="Text color">
            <va-badge label="Default" />
            <va-badge label="Info" textColor="info" />
            <va-badge label="Danger" textColor="danger" />
            <va-badge label="Warning" textColor="warning" />
            <va-badge label="gray" textColor="gray" />
            <va-badge label="dark" textColor="dark" />
            <va-badge label="Success" textColor="success" color="dark" />
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
            <va-badge label="icon"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Slotted label">
            <va-badge label="I am Label">only label</va-badge><br /><br />
            <va-badge label="I am Badge" multiLine><template v-slot:badge>I am Badge</template>slotted badge</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge>I am Badge</template>label + slotted badge</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge><span class="icon brandico brandico-facebook-rect"></span></template>slotted icon</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge><span class="icon brandico brandico-facebook-rect"></span></template><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="MultiLine badges">
            <va-badge><template v-slot:badge>Multi<br />Line</template>without multiLine prop</va-badge><br /><br />
            <va-badge multiLine><template v-slot:badge>Multi<br />Line</template>Multi line</va-badge><br /><br />
            <va-badge multiLine><template v-slot:badge>Multi<br />Line<br />more</template>Multi line</va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Dotted badges">
            <va-badge dot label="Regular">Regular</va-badge><br /><br />
            <va-badge dot label="Bottom" bottom>Bottom</va-badge><br /><br />
            <va-badge dot label="Left" left>Left</va-badge><br /><br />
            <va-badge dot label="Bottom+Left" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot label="Regular"><span class="icon brandico brandico-facebook-rect"/></va-badge><br /><br />
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
          <va-badge overlap label="1+"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </VbCard>
        </td>
        <td>
          <VbCard title="Overlap badges dot">
            <va-badge dot overlap label="dot overlap">Regular</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom>Bottom</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" left>Left</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot overlap label="icon"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
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
            Empty dot: <va-badge dot transparent /><br />
            Not empty: <va-badge label="not empty" transparent /><br />
          </VbCard>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <VbCard title="Approximate number:">
            <va-badge :label="0" approximateNumber visibleEmpty>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="1" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="12" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="999" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="1234" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="12345" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="123456" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="1234567" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="12345678" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="123456789" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
            <va-badge :label="12345678912345" approximateNumber>Statuses</va-badge>&nbsp;&nbsp;&nbsp;
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

            <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty"><div style="width: 100px; height: 100px; border: 2px solid red">Custom<br />size</div></va-badge>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'

export default {
  components: { VaBadge },
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
