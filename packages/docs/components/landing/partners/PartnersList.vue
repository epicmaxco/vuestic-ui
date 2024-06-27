<script setup lang="ts">
  import Chromatic from './icons/Chromatic.vue';
  import VueJsNation from './icons/VueJsNation.vue';
  import VueSchool from './icons/VueSchool.vue';
  import JetBrains from './icons/JetBrains.vue';
  import Epicmax from './icons/Epicmax.vue';
  import VueJobs from './icons/VueJobs.vue';
  import CodeSandbox from './icons/CodeSandbox.vue';
  import AGGrid from './icons/AGGrid.vue';
  import VueForge from './icons/VueForge.vue';
  import FlatLogic from './icons/FlatLogic.vue';

  const iconsColor = '#ffffff'
  const baseHeight = 22
</script>

<template>
  <div class="flex flex-col gap-4 items-center pt-4">
    <div class="flex items-center justify-center lg:justify-between w-full max-w-7xl gap-8 md:gap-4 mb-4 flex-wrap">
      <a
        href="https://www.epicmax.co/?utm_source=vuestic_admin&utm_medium=landing&utm_campaign=logo"
        target="_blank"
        title="Epicmax - Top Vue.js Development Company"
      >
        <Epicmax
          :height="baseHeight * 0.6"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://vuejobs.com/?utm_source=vuestic_admin&utm_medium=landing&utm_campaign=logo"
        target="_blank"
        title="Vue.js jobs – Browse through dozens of Vue.js openings"
        class="partners__logo logo__vue-jobs"
      >
        <VueJobs
          :height="24"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://www.jetbrains.com/?utm_source=Epicmax&utm_medium=partners_logo&utm_campaign=vuestic"
        target="_blank"
        title="JetBrains - The Capable and Ergonomic IDE for JVM"
        class="partners__logo logo__vue-jobs"
      >
        <JetBrains
          :height="24"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://codesandbox.io/?utm_source=Epicmax&utm_medium=partners_logo&utm_campaign=vuestic"
        target="_blank"
        title="CodeSandbox - An online editor tailored for web applications"
      >
        <CodeSandbox
          :height="baseHeight * 1.1"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://www.ag-grid.com/?utm_source=vuestic_admin&utm_medium=landing&utm_campaign=logo"
        target="_blank"
        title="Data Grid: AG Grid: High-Performance React Grid, Angular Grid, JavaScript Grid"
      >
        <AGGrid
          :height="baseHeight * 0.9"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://vuejsforge.com/?utm_source=Epicmax&utm_medium=partners_logo&utm_campaign=vuestic/"
        target="_blank"
        title="Vue.js Forge - The largest hands-on Vue.js Event"
      >
        <VueForge
          :height="baseHeight * 0.8"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://chromatic.com/?utm_source=github&utm_medium=profile&utm_campaign=vuestic"
        target="_blank"
        title="Chromatic - Storybook deployment, review, and test"
      >
        <Chromatic
          :height="baseHeight * 0.9"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://flatlogic.com/?utm_source=vuestic_admin&utm_medium=landing&utm_campaign=logo"
        target="_blank"
        title="Flatlogic - The best way to create React, Angular and Vue full-stack web applications"
      >
        <FlatLogic
          :height="baseHeight * 0.8"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://vuejsnation.com/?utm_medium=TWITTER&utm_source=VuesticUI&utm_content=VN2024_recruitment&utm_campaign=community"
        target="_blank"
        title="Vue.js Nation - The largest and only 100% FREE Vue.js conference in the world"
      >
        <VueJsNation
          :height="24 * 0.8"
          :color="iconsColor"
        />
      </a>

      <a
        href="https://vueschool.io/?utm_medium=TWITTER&utm_source=VuesticUI&utm_content=VN2024_recruitment&utm_campaign=community"
        target="_blank"
        title="Vue School"
      >
        <VueSchool
          :height="24 * 1"
          :color="iconsColor"
        />
      </a>
    </div>
    <p class="text-regularLarge text-white text-center">
      Our beloved Partners & Sponsors that support us ❤️
    </p>
  </div>
</template>
