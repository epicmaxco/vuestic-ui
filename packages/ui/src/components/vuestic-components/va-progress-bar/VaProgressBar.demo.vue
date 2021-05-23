<template>
  <VbDemo>
    <VbCard title="Default">
      No value:
      <va-progress-bar />
      <br>
      Default
      <va-progress-bar :modelValue="value" />
      <br>
      Rounded: false
      <va-progress-bar
        :rounded="false"
        :modelValue="value"
      />
      <br>
      Invisible
      <va-progress-bar :invisible="invisible" />
    </VbCard>

    <VbCard title="Color">
      Danger color
      <va-progress-bar
        :modelValue="value"
        color="danger"
      />
      <br>
      Custom color
      <va-progress-bar
        :modelValue="value"
        color="purple"
      />
    </VbCard>

    <VbCard title="Size">
      Size small
      <va-progress-bar
        size="small"
        :modelValue="value"
      />
      <br>
      Size large
      <va-progress-bar
        size="large"
        :modelValue="value"
      />
      <br>
      Size 25px
      <va-progress-bar
        :size="25"
        :modelValue="value"
      />
      <br>
      Size rem
      <va-progress-bar
        size="2rem"
        :modelValue="value"
      />
      <br>
      Size rem invisible
      <va-progress-bar
        size="2rem"
        :modelValue="value"
        :invisible="invisible"
      />
    </VbCard>

    <VbCard title="Slotted">
      Static slot
      <va-progress-bar :modelValue="value">
        Slot
      </va-progress-bar>
      <br>
      Small preset
      <va-progress-bar
        :modelValue="value"
        size="small"
      >
        Slot
      </va-progress-bar>
      <br>
      Large preset
      <va-progress-bar
        :modelValue="value"
        :rounded="false"
        size="large"
      >
        {{ value + '%' }}
      </va-progress-bar>
      <br>
      Dynamic slot
      <va-progress-bar :modelValue="value">
        {{ value + '%' }}
      </va-progress-bar>
      <br>
      Invisible
      <va-progress-bar
        :modelValue="value"
        :invisible="invisible"
      >
        {{ value + '%' }}
      </va-progress-bar>
    </VbCard>

    <VbCard title="Indeterminate">
      Indeterminate
      <va-progress-bar indeterminate />
    </VbCard>

    <VbCard title="Reverse">
      <va-progress-bar
        :modelValue="value"
        reverse
      />
      <br>
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="60"
        reverse
      />
      <br>
      Indeterminate
      <va-progress-bar
        indeterminate
        reverse
      />
    </VbCard>

    <VbCard
      title="Buffer"
      width="400px"
    >
      Buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="bufferValue"
      />
      <br>
      Invisible reversed buffer
      <va-progress-bar
        :modelValue="value"
        :buffer="bufferValue"
        :invisible="invisible"
        reverse
      />
    </VbCard>

    <VbCard title="context checks">
      <div>
        value:
        <VaContext :components="{VaProgressBar: {value: 50}}">
          <VaProgressBar />
        </VaContext>
      </div>
      <div>
        indeterminate:
        <VaContext :components="{VaProgressBar: {indeterminate: true}}">
          <VaProgressBar />
        </VaContext>
      </div>
      <div>
        color:
        <VaContext :components="{VaProgressBar: {color: 'danger'}}">
          <VaProgressBar :modelValue="80" />
        </VaContext>
      </div>
      <div>
        size:
        <VaContext :components="{VaProgressBar: {size: 30}}">
          <VaProgressBar :modelValue="80" />
        </VaContext>
      </div>
      <div>
        reverse:
        <VaContext :components="{VaProgressBar: {reverse: true}}">
          <VaProgressBar :modelValue="30" />
        </VaContext>
      </div>
      <div>
        rounded (false):
        <VaContext :components="{VaProgressBar: {rounded: false}}">
          <VaProgressBar />
        </VaContext>
      </div>
      <div>
        invisible (true):
        <VaContext :components="{VaProgressBar: {invisible: true}}">
          <VaProgressBar />
        </VaContext>
      </div>
    </VbCard>

    <VbCard title="Controls">
      Values:
      <div>
        <button @click="value -= 100">
          -100
        </button>
        <button @click="value -= 10">
          -10
        </button>
        <input
          style="width: 50px;"
          type="number"
          v-model.number="value"
        >
        <button @click="value += 10">
          +10
        </button>
        <button @click="value += 100">
          +100
        </button>
      </div>
      <br>
      Buffer values:
      <div>
        <button @click="bufferValue -= 100">
          -100
        </button>
        <button @click="bufferValue -= 10">
          -10
        </button>
        <input
          style="width: 50px;"
          type="number"
          v-model.number="bufferValue"
        >
        <button @click="bufferValue += 10">
          +10
        </button>
        <button @click="bufferValue += 100">
          +100
        </button>
      </div>
      <br>
      Invisible:
      <div>
        <input
          type="checkbox"
          v-model="invisible"
        >
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaProgressBar } from './index'
import VaContext from '../va-config'

export default {
  components: {
    VaContext,
    VaProgressBar,
  },
  data () {
    return {
      bufferValue: 45,
      value: 35,
      invisible: true,
    }
  },
}
</script>
