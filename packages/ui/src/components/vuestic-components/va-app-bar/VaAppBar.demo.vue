<template>
  <VbDemo>
    <VbCard title="Default">
      <div class="frame">
        <div class="display">
          <va-app-bar>
            <AppBarTestContent/>
          </va-app-bar>
        </div>
      </div>
    </VbCard>

    <VbCard title="Color">
      <div class="frame">
        <div class="display">
          <va-app-bar color="secondary">
            <AppBarTestContent/>
          </va-app-bar>
        </div>
      </div>
    </VbCard>

    <VbCard title="Bottom">
      <div class="frame">
        <div class="display">
          <va-app-bar bottom>
            <AppBarTestContent/>
          </va-app-bar>
        </div>
      </div>
    </VbCard>

    <VbCard title="Hide on scroll">
      <div class="frame">
        <div class="display">
          <va-app-bar
            target="#scrollable-element2"
            hide-on-scroll
          >
            <AppBarTestContent/>
          </va-app-bar>
          <div
            class="content"
            id="scrollable-element2"
          >
            {{ $vb.lorem(2000)}}
          </div>
        </div>
      </div>
    </VbCard>

    <VbCard title="Hide & Bottom">
      <div class="frame">
        <div class="display">
          <va-app-bar
            bottom
            hide-on-scroll
            target="#scrollable-element"
          >
            <AppBarTestContent/>
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

    <VbCard title="Shadow on scroll">
      <div class="frame">
        <div class="display">
          <va-app-bar
            target="#scrollable-element3"
            shadow-on-scroll
          >
            <AppBarTestContent/>
          </va-app-bar>
          <div
            class="content"
            id="scrollable-element3"
          >
            {{ $vb.lorem(2000)}}
          </div>
        </div>
      </div>
    </VbCard>

    <VbCard title="Shadow on scroll & Bottom">
      <div class="frame">
        <div class="display">
          <va-app-bar
            bottom
            shadow-on-scroll
            target="#scrollable-element4"
          >
            <AppBarTestContent/>
          </va-app-bar>
          <div
            class="content"
            id="scrollable-element4"
          >
            {{ $vb.lorem(2000)}}
          </div>
        </div>
      </div>
    </VbCard>

    <VbCard title="Shadow on scroll and custom shadow color">
      <div class="frame">
        <div class="display">
          <va-app-bar
            shadow-on-scroll
            shadow-color="danger"
            target="#scrollable-element5"
          >
            <AppBarTestContent/>
          </va-app-bar>
          <div
            class="content"
            id="scrollable-element5"
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
import AppBarTestContent from './AppBarTestContent.vue'

export default {
  components: {
    AppBarTestContent,
    VaAppBar,
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
