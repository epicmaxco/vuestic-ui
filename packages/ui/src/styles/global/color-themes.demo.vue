<template>
  <VbDemo>
    <VbCard title="All of these share `info` theme">
      <va-button
        class="mb-5"
        color="info"
      >
        Default Button
      </va-button>
      <va-alert
        class="mb-5"
        color="info"
      >
        <va-badge
          color="info"
          label="Info"
        />
        You successfully read this important alert message.
      </va-alert>
      <va-progress-bar
        class="mb-5"
        indeterminate
        color="info"
      />
      <va-slider
        class="mb-5"
        :modelValue="60"
        value-visible
        label="Label"
        color="info"
        icon-right="volume_up"
      />
    </VbCard>
    <VbCard style="position: relative;">
      <va-rating
        class="mb-5"
        color="info"
        :modelValue="3"
      >
        Default Button
      </va-rating>
      <va-file-upload
        v-model="files"
        color="info"
      />
    </VbCard>
    <VbCard title="These 2 badges share `info` theme">
      <va-badge
        color="info"
        label="Info badge"
      />
    </VbCard>
    <VbCard title="Darken theme a bit">
      <button @click="darkenTheme()">
        Darken
      </button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaButton from '../../components/va-button/VaButton'
import VaAlert
  from '../../components/va-alert/VaAlert'
import VaProgressBar
  from '../../components/va-progress-bar/VaProgressBar'
import VaRating from '../../components/va-rating/VaRating'
import VaBadge from '../../components/va-badge/VaBadge'
import VaFileUpload from '../../components/va-file-upload/VaFileUpload'
import VaSlider from '../../components/va-slider/VaSlider'

export default {
  components: {
    VaBadge,
    VaFileUpload,
    VaRating,
    VaButton,
    VaAlert,
    VaProgressBar,
    VaSlider,
  },
  data () {
    return {
      value: 60,
      icon: 'info_outline',
      files: [],
    }
  },
  methods: {
    darkenTheme () {
      console.log('darken')
      // NOTE For testing. So that we can observe theme changed
      const newTheme = {
        primary: '#9A0931',
        secondary: '#C50B0B',
        success: '#06421E',
        info: '#021C38',
        danger: '#440606',
        warning: '#3C2D03',
        gray: '#babfc2',
        dark: '#34495e',
      }

      for (const index in newTheme) {
        this.$themes[index] = newTheme[index]
      }
    },
  },
}
</script>
