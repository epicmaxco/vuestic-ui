<template>
  <VbDemo>
    <VbCard title="Default">
      <div class="frame">
        <div class="display">
          <va-app-bar>
          <va-button icon="home" :color="color" outline :round="false">
          </va-button>
          <va-spacer />
          <va-button :color="color">
            GG
          </va-button>
          <va-app-bar-section hover="dark">
            Dark
          </va-app-bar-section>
          <va-app-bar-section hover="light">
            Light
          </va-app-bar-section>
          </va-app-bar>
        </div>
      </div>
    </VbCard>

    <VbCard title="Hide on scroll">
      <div class="frame">
        <div class="display">
          <va-app-bar
            color="warning"
            target="#scrollable-element"
          >
          <va-button icon="home" :color="color" outline :round="false">
          </va-button>
          <va-spacer />
          <va-button :color="color">
            GG
          </va-button>
          <va-app-bar-section hover="dark">
            Dark
          </va-app-bar-section>
          <va-app-bar-section hover="light">
            Light
          </va-app-bar-section>
          </va-app-bar>
          <div
            class="content"
            id="scrollable-element"
          >
            {{ $vb.lorem(2000)}}
          </div>
        </div>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaAppBar from '../va-app-bar/VaAppBar'
import VaButton from '../va-button/VaButton'
import VaSpacer from '../va-spacer/VaSpacer'
import VaAppBarSection from './VaAppBarSection'

export default {
  components: {
    VaAppBar,
    VaButton,
    VaSpacer,
    VaAppBarSection,
  },
  data () {
    return {
      color: 'primary',
    }
  },
}
</script>

<style>
  .frame {
    border-radius: 1rem;
    background: #2c2c2c;
    padding: 3rem 0.5rem;
    display: block;
  }

  .display {
    display: flex;
    flex-direction: column;
    position: relative;
    background: linear-gradient(90deg, aqua, yellow);
    width: 314px;
    height: 536px;
    overflow: hidden;
  }

  .content {
    overflow: auto;
  }
</style>
