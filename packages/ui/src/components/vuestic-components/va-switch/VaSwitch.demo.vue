<template>
  <VbDemo>
    <VbCard title="Default">
      <div>
        {{ value }}
      </div>
      <va-switch v-model="value" />
    </VbCard>
    <VbCard title="Colors">
      <va-switch v-model="value" />
      <va-switch
        v-model="value"
        color="info"
      />
      <va-switch
        v-model="value"
        color="danger"
      />
      <va-switch
        v-model="value"
        color="warning"
      />
      <va-switch
        v-model="value"
        color="gray"
      />
      <va-switch
        v-model="value"
        color="dark"
      />
    </VbCard>
    <VbCard title="With label">
      <va-switch
        v-model="value"
        label="turn"
      />
      <va-switch v-model="value">
        <div style="background: mediumpurple;">
          Slot label
        </div>
      </va-switch>
    </VbCard>
    <VbCard title="Sizes">
      <va-switch
        v-model="value"
        size="small"
        label="small"
      />
      <va-switch
        v-model="value"
        label="default"
      />
      <va-switch
        v-model="value"
        size="large"
        label="large"
      />
    </VbCard>
    <VbCard title="Custom trueValue, falseValue">
      <va-switch
        v-model="customTrueFalse"
        true-value="agree"
        false-value="disagree"
        :label="`${customTrueFalse}`"
      />
    </VbCard>
    <VbCard title="Array as model">
      <div>
        {{ selection }}
      </div>
      <va-switch
        v-model="selection"
        array-value="one"
        label="one"
      />
      <va-switch
        v-model="selection"
        array-value="two"
        label="two"
      />
      <va-switch
        v-model="selection"
        array-value="three"
        label="three"
      />
      <va-switch
        v-model="selection"
        array-value="four"
        label="four"
      />
    </VbCard>
    <VbCard title="Object values">
      <div>
        {{ selectionObjectValues }}
      </div>
      <va-switch
        v-for="objectOption in objectOptions"
        :key="objectOption.id"
        v-model="selectionObjectValues"
        :array-value="objectOption"
        :label="objectOption.name"
      />
    </VbCard>
    <VbCard title="Disabled">
      <va-switch
        v-model="value"
        disable
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSwitch from './VaSwitch'

export default {
  components: {
    VaSwitch,
  },
  data () {
    return {
      value: true,
      customTrueFalse: 'disagree',
      selection: [],
      selectionObjectValues: [],
      objectOptions: [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
      ],
    }
  },
}
</script>
