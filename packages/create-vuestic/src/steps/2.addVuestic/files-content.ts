export const VUESTIC_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="20" fill="none" viewBox="0 0 180 20">
<path fill="#fff" d="M170.5 8.9c-1.2 0-2-.3-2.6-1-.5-.7-.8-1.7-.8-3V.5h2.1v4.5c0 .7.2 1.2.3 1.5.2.3.5.5 1 .5.4 0 .7-.2 1-.5l.2-1.5V.6h2.1v4.2c0 1.4-.3 2.5-.8 3.1-.6.7-1.4 1-2.5 1Zm6.3-.2v-8h2.1v8h-2.1Z"/>
<path fill="url(#a)" d="M8 19.2 0 .6h4.6l3.6 8.7L12 .6h4.5l-8 18.6H8Zm19.2-6.7V.6h4.4v11.3c0 2.4 1.1 3.2 2.6 3.2 1.7 0 2.8-.8 2.8-3.2V.6h4.4v12c0 4.2-3.2 6.6-7.2 6.6s-7-2.5-7-6.7Zm26 6.1V.6h12v3.9h-7.5v3.2h6.9v3.9h-7v3.2h7.9v3.8H53.2Zm23.3-5.3h4.3c0 1 .9 2 1.9 2 1 0 1.8-.7 1.8-1.7 0-1.3-1.8-1.7-3.3-2.2-3-1-4.7-2.5-4.7-5.6A6 6 0 0 1 82.7 0c4 0 5.8 2.5 6 5.9h-4c0-1-.7-1.9-2-1.9-.9 0-1.8.6-1.8 1.8 0 1.3 1.6 1.5 3.2 2 3.2 1 4.7 2.8 4.7 5.6a6 6 0 0 1-6.1 5.8c-4 0-6.2-2.6-6.2-5.9Zm27.1 5.3V4.5h-4V.6h12.5v3.9h-4v14.1h-4.5Zm19.6 0V.6h4.4v18h-4.4Zm16.5-9c0-5.4 4-9.6 9.7-9.6a10 10 0 0 1 7.7 3.3l-3 2.9a6.7 6.7 0 0 0-4.7-2c-3.2 0-5.3 2.4-5.3 5.4s2 5.4 5.3 5.4c1.8 0 3.4-.8 4.7-2l3 2.9a10.2 10.2 0 0 1-7.7 3.3 9.4 9.4 0 0 1-9.8-9.6Z"/>
<defs>
  <linearGradient id="a" x1="0" x2="178" y1="10" y2="10" gradientUnits="userSpaceOnUse">
    <stop stop-color="#fff"/>
    <stop offset="1" stop-color="#fff"/>
  </linearGradient>
</defs>
</svg>`

export const EMPTY_TEMPLATE = `<template></template>`.trim()

export const APP_TEMPLATE = `
<script setup>
const nextSteps = [
  { icon: 'settings', title: 'Configuration', text: 'Deeply customize your project with our convenient mechanism.', link: 'https://ui.vuestic.dev/getting-started/configuration-guide'},
  { icon: 'handshake', title: 'Contribution', text: 'Become a part of the ongoing development of Vuestic UI.', link: 'https://ui.vuestic.dev/contribution/guide'},
  { icon: 'group', title: 'Community', text: 'Join our friendly community.', link: 'https://discord.gg/u7fQdqQt8c'},
  { icon: 'alt_route', title: 'Tree shaking', text: 'Optimize your bundle size.', link: 'https://ui.vuestic.dev/getting-started/tree-shaking'},
  { icon: 'dashboard', title: 'Kitchensink', text: 'Showcase of all components.', link: 'https://ui.vuestic.dev/getting-started/kitchensink'},
  { icon: 'star', title: 'Vuestic Admin', text: 'Try our admin template project.', link: 'https://admin.vuestic.dev/'},
]
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="300" height="125" />
  </header>

  <main>
    <h5 class="app-title">
      Congratulations! <br/>You've successfully installed the project.
    </h5>

    <h5 class="app-text">What's next?</h5>
    <div>
      <div class="steps-row">
        <div v-for="step in nextSteps" class="steps-column">
          <VaCard
            :href="step.link"
            target="_blank"
          >
            <VaCardTitle>
              <VaIcon class="steps-icon" :name="step.icon"></VaIcon>{{ step.title }}
            </VaCardTitle>
            <VaCardContent>
              {{ step.text }}
            </VaCardContent>
          </VaCard>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
#app {
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(180deg, #2450be, #557de2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
  padding: 2rem;
}

.app-title {
  font-size: 2rem;
  margin: 0;
  text-align: center;
}

.app-text {
  margin: 2rem 0;
  font-size: 1.75rem;
  text-align: center;
}

.steps-icon {
  margin-right: 0.5rem;
}

.steps-row {
  margin-top: 1rem;
  flex-direction: row;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  min-width: 0;
  max-width: 800px;
}

@media (min-width: 0) {
  .steps-column {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
    padding: 0.75rem 0;
  }
}

@media (min-width: 768px) {
  .steps-column {
    flex-basis: 50%;
    flex-grow: 0;
    max-width: 50%;
    padding: 1rem;
  }
}
</style>

`.trim()

export const MAIN_CSS_STYLES = `
:root {
  --va-font-family: 'Source Sans Pro', sans-serif;
}

`
