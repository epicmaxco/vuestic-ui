<template>
  <VbDemo>
    <VbCard width="500px" title="Default">
      {{value}}
      <va-toggle v-model="value"/>
    </VbCard>
    <VbCard width="500px" title="Colors">
      <va-toggle v-model="value"/>
      <va-toggle v-model="value" color="info"/>
      <va-toggle v-model="value" color="danger"/>
      <va-toggle v-model="value" color="warning"/>
      <va-toggle v-model="value" color="gray"/>
      <va-toggle v-model="value" color="dark"/>
    </VbCard>
    <VbCard width="500px" title="With label">
      <va-toggle v-model="value" label="turn"/>
      <va-toggle v-model="value">
        <div style="background: mediumpurple">Slot label</div>
      </va-toggle>
    </VbCard>
    <VbCard width="500px" title="Sizes">
      <va-toggle v-model="value" size="small" label="small"/>
      <va-toggle v-model="value" label="default"/>
      <va-toggle v-model="value" size="large" label="large"/>
    </VbCard>
    <VbCard width="500px" title="Custom trueValue, falseValue">
      <va-toggle
        v-model="customTrueFalse"
        true-value="agree"
        false-value="disagree"
        :label="`${customTrueFalse}`"
      />
    </VbCard>
    <VbCard width="500px" title="Array as model">
      <div>
        {{selection}}
      </div>
      <va-toggle v-model="selection" array-value="one" label="one"/>
      <va-toggle v-model="selection" array-value="two" label="two"/>
      <va-toggle v-model="selection" array-value="three" label="three"/>
      <va-toggle v-model="selection" array-value="four" label="four"/>
    </VbCard>
    <VbCard width="500px" title="Object values">
      <div>
        {{selection}}
      </div>
      <va-toggle
        v-for="objectOption in objectOptions"
        :key="objectOption.id"
        v-model="selection"
        :array-value="objectOption"
        :label="objectOption.name"
      />
    </VbCard>
    <VbCard width="500px" title="Disabled">
      <va-toggle v-model="value" disable/>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaToggle from './VaToggle'

export default {
  components: {
    VaToggle,
  },
  data () {
    return {
      value: true,
      customTrueFalse: 'disagree',
      selection: [],
      objectOptions: [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
      ],
    }
  },
}
</script>
