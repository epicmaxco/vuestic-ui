<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tag>
        vuestic
      </va-tag>
    </VbCard>

    <VbCard title="Colors">
      <va-tag
        v-for="(color, index) in colors"
        :key="index"
        :color="color"
      >
        {{color}}
      </va-tag>
    </VbCard>

    <VbCard title="Outline">
      <va-tag
        v-for="(color, index) in colors"
        :key="index"
        outline
        :color="color"
      >
        {{color}}
      </va-tag>
    </VbCard>

    <VbCard title="Flat">
      <va-tag
        v-for="(color, index) in colors"
        :key="index"
        flat
        :color="color"
      >
        {{color}}
      </va-tag>
    </VbCard>

    <VbCard title="Sizes">
      <va-tag
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        closeable
      >
        {{size}} size
      </va-tag>
    </VbCard>

    <VbCard title="Icons">
      <va-tag
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon"
        icon-size="20px"
      >
        {{icon}}
      </va-tag>
    </VbCard>

    <VbCard title="Square">
      <va-tag square>
        vuestic
      </va-tag>
    </VbCard>

    <VbCard title="Closeable">
      <va-checkbox v-model="value" />
      <va-tag
        v-model="value"
        closeable
      >
        vuestic
      </va-tag>
    </VbCard>

    <VbCard title="Disabled">
      <va-tag disabled closeable stateful>
        vuestic
      </va-tag>
    </VbCard>

    <VbCard title="Stateful">
      <va-tag
        stateful
        closeable
      >
        vuestic
      </va-tag>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTag from './VaTag'
import VaCheckbox from '../va-checkbox/VaCheckbox'

export default {
  components: {
    VaTag,
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
        'heart',
        'star',
        'battery',
      ],
    }
  },
}
</script>

<style scoped>
</style>
