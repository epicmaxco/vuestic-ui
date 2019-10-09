<template>
  <VbDemo>
    <VbCard style="width: 100%">
      <table style="width: 100%">
        <tr>
          <td>Regular badges:&nbsp;</td>
          <td>
            <va-badge label="Paid" />
            <va-badge label="Info" color="info" />
            <va-badge label="Danger" color="danger" />
            <va-badge label="Warning" color="warning" />
            <va-badge label="gray" color="gray" />
            <va-badge label="dark" color="dark" />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Colored text:</td>
          <td>
            <va-badge label="Regular">Float at</va-badge><br /><br />
            <va-badge label="#05f" textColor="#05f">Hex color</va-badge><br /><br />
            <va-badge label="rgb(227, 75, 74)" textColor="rgb(227, 75, 74)">RGB color</va-badge><br /><br />
            <va-badge label="rgba(227, 75, 74, 0.4)" textColor="rgba(227, 75, 74, 0.4)">RGBA color</va-badge><br /><br />
            <va-badge label="purple" textColor="purple">Text color</va-badge><br /><br />
            <va-badge label="rgba(0,0,0,0.5)" textColor="rgba(0,0,0,0.5)"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td>Floated badges:</td>
          <td>
            <va-badge label="Regular">Float at</va-badge><br /><br />
            <va-badge label="Bottom" bottom>Float at</va-badge><br /><br />
            <va-badge label="Left" left>Float at</va-badge><br /><br />
            <va-badge label="Bottom+Left" bottom left>Float at</va-badge><br /><br />
            <va-badge label="icon"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Sloated label:</td>
          <td>
            <va-badge label="I am Label">only label</va-badge><br /><br />
            <va-badge label="I am Badge" multiLine><template v-slot:badge>I am Badge</template>slotted badge</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge>I am Badge</template>label + slotted badge</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge><span class="icon brandico brandico-facebook-rect"></span></template>slotted icon</va-badge><br /><br />
            <va-badge label="I am Label" multiLine><template v-slot:badge><span class="icon brandico brandico-facebook-rect"></span></template><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>MultiLine badges:&nbsp;&nbsp;</td>
          <td>
            <va-badge><template v-slot:badge>Multi<br />Line</template>without multiLine prop</va-badge><br /><br />
            <va-badge multiLine><template v-slot:badge>Multi<br />Line</template>Multi line</va-badge><br /><br />
            <va-badge multiLine><template v-slot:badge>Multi<br />Line<br />more</template>Multi line</va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Dotted badges:</td>
          <td>
            <va-badge dot label="Regular">Regular</va-badge><br /><br />
            <va-badge dot label="Bottom" bottom>Bottom</va-badge><br /><br />
            <va-badge dot label="Left" left>Left</va-badge><br /><br />
            <va-badge dot label="Bottom+Left" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot label="Regular"><span class="icon brandico brandico-facebook-rect"/></va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Overlap badges:</td>
          <td>
            <va-badge overlap label="overlap">Regular</va-badge><br /><br />
            <va-badge overlap label="overlap" bottom>Bottom</va-badge><br /><br />
            <va-badge overlap label="overlap" left>Left</va-badge><br /><br />
            <va-badge overlap label="overlap" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge overlap label="1+"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
            <va-badge dot overlap label="dot overlap">Regular</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom>Bottom</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" left>Left</va-badge><br /><br />
            <va-badge dot overlap label="dot overlap" bottom left>Bottom+Left</va-badge><br /><br />
            <va-badge dot overlap label="icon"><span class="icon brandico brandico-facebook-rect"></span></va-badge><br /><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>VisibleEmpty:</td>
          <td>
            Empty: <va-badge /><br />
            Empty dot: <va-badge dot /><br />
            Empty with visibleEmpty prop: <va-badge visibleEmpty /><br />
            Dot with visibleEmpty prop: <va-badge visibleEmpty dot /><br />
            Not empty: <va-badge label="not empty" /><br />
            With Icon:
            <va-badge>
              <template v-slot:badge>
              <span>
                <span class="icon brandico brandico-facebook-rect"></span>
                text
                <span class="icon brandico brandico-instagram"></span>
              </span>
              </template>
            </va-badge><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Transparent:</td>
          <td>
            Empty: <va-badge transparent /><br />
            Empty dot: <va-badge dot transparent /><br />
            Empty with visibleEmpty prop: <va-badge visibleEmpty transparent /><br />
            Dot with visibleEmpty prop: <va-badge visibleEmpty dot transparent /><br />
            Not empty: <va-badge label="not empty" transparent /><br />
            With Icon:
            <va-badge transparent>
              <template v-slot:badge>
                <span class="icon brandico brandico-facebook-rect"></span>
                text
                <span name="icon brandico brandico-instagram mx-2"></span>
              </template>
            </va-badge><br />
          </td>
        </tr>
        <tr>
          <td colspan="2"><br /></td>
        </tr>
        <tr>
          <td>Approximate number:</td>
          <td>
            <va-badge approximateNumber label="1025">approximate 1025</va-badge><br />
            <va-badge approximateNumber label="1">approximate 1</va-badge><br />
            <va-badge approximateNumber label="10">approximate 10</va-badge><br />
            <va-badge approximateNumber label="10123123">approximate 10123123</va-badge><br />
          </td>
        </tr>
      </table>
    </VbCard>
    <VbCard title="Approximate number:">
      <VbDemo>
        <VbCard title="0"><va-badge :label="0" approximateNumber visibleEmpty>Statuses</va-badge></VbCard>
        <VbCard title="1 sign"><va-badge :label="1" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="2 signs"><va-badge :label="12" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="3 sign"><va-badge :label="999" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="4 sign"><va-badge :label="1234" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="5 sign"><va-badge :label="12345" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="6 sign"><va-badge :label="123456" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="7 sign"><va-badge :label="1234567" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="8 sign"><va-badge :label="12345678" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="9 sign"><va-badge :label="123456789" approximateNumber>Statuses</va-badge></VbCard>
        <VbCard title="14 sign"><va-badge :label="12345678912345" approximateNumber>Statuses</va-badge></VbCard>
      </VbDemo>
    </VbCard>
    <VbCard title="controls">
      Label: <input v-model="label"/><br />
      TextColor: <input v-model="textColor"/><br />
      Dot: <input type="checkbox" v-model="dot"/><br />
      Transparent: <input type="checkbox" v-model="transparent"/><br />
    </VbCard>
    <VbCard title="controls">
      VisibleEmpty: <input type="checkbox" v-model="visibleEmpty"/><br />
      Left: <input type="checkbox" v-model="left"/><br />
      Bottom: <input type="checkbox" v-model="bottom"/><br />
      Overlap: <input type="checkbox" v-model="overlap"/><br />
    </VbCard>
    <VbCard title="Dynamic data badges">
      <va-badge label="Regular">Default</va-badge>
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" >Default</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" color="info">Info</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" color="danger">Danger</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" color="warning">Warning</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" color="gray">Gray</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" color="dark">Dark</va-badge>&nbsp;&nbsp;&nbsp;
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor"><div style="width: 100px; height: 100px; border: 2px solid red">Custom<br />size</div></va-badge>
      <va-badge :transparent="transparent" :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" :textColor="textColor" approximateNumber>approximate number</va-badge>
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
      textColor: '#fff',
    }
  },
}
</script>
