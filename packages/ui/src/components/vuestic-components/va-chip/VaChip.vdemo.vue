<template>
  <VbDemo>
    <VbCard title="Default">
      <va-chip>
        vuestic
      </va-chip>
    </VbCard>

    <VbCard title="Colors">
      <va-chip
        v-for="(color, index) in colors"
        :key="index"
        :color="color"
      >
        {{color}}
      </va-chip>
    </VbCard>

    <VbCard title="Outline">
      <va-chip
        v-for="(color, index) in colors"
        :key="index"
        outline
        :color="color"
      >
        {{color}}
      </va-chip>
    </VbCard>

    <VbCard title="Flat">
      <va-chip
        v-for="(color, index) in colors"
        :key="index"
        flat
        :color="color"
      >
        {{color}}
      </va-chip>
    </VbCard>

    <VbCard title="Sizes">
      <va-chip
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        closeable
      >
        {{size}} size
      </va-chip>
    </VbCard>

    <VbCard title="Icons">
      <va-chip
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon"
      >
        {{icon}}
      </va-chip>
    </VbCard>

    <VbCard title="Sizes with icons">
      <va-chip
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        icon="info"
        closeable
      >
        {{size}} size
      </va-chip>
    </VbCard>

    <VbCard title="Square">
      <va-chip square>
        vuestic
      </va-chip>
    </VbCard>

    <VbCard title="Sizes with square prop and icons">
      <va-chip
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        icon="info"
        square
        closeable
      >
        {{size}} size
      </va-chip>
    </VbCard>

    <VbCard title="Closeable">
      <va-checkbox v-model="value" />
      <va-chip
        v-model="value"
        closeable
      >
        vuestic
      </va-chip>
    </VbCard>

    <VbCard title="Link">
      <va-chip to="/demo/vuestic-components/va-switch/VaSwitch.demo.vue">
        Vuestic va-switch
      </va-chip>
    </VbCard>

    <VbCard title="Link with closeable prop">
      <va-chip
        to="/demo/vuestic-components/va-button/VaButton.demo.vue"
        closeable
        v-model="value"
      >
        Vuestic va-button
      </va-chip>
    </VbCard>

    <VbCard title="Disabled">
      <va-chip
        disabled
        closeable
        :stateful="true"
      >
        vuestic
      </va-chip>
    </VbCard>

    <VbCard title="Stateful">
      <va-chip
        stateful
        closeable
      >
        vuestic
      </va-chip>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaChip from './index'
import VaCheckbox from '../va-checkbox'

export default {
  components: {
    VaChip,
    VaCheckbox,
  },
  data () {
    return {
      value: true,
      colors: [
        'primary',
        'danger',
        'info',
        'gray',
        '#7f1f90',
      ],
      sizes: [
        'small',
        'medium',
        'large',
      ],
      icons: [
        'face',
        'email',
        'thumb_up',
        'info',
        'remove',
      ],
    }
  },
}
</script>

<style scoped>
</style>
