<template>
  <va-content class="va-skeleton page-config">
    <h1 class="page-config-title">
      Loading title
    </h1><br/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus harum, autem obcaecati...</p>
    <br/>
    <h3 class="page-config-subtitle">
      Loading title
    </h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus harum, autem obcaecati voluptatum, ipsum laudantium consequatur amet qui porro delectus</p>

    <va-card style="height: 150px; width: 100%">

    </va-card>

    <h3 class="page-config-subtitle">
      Loading title
    </h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus harum, autem obcaecati voluptatum, ipsum laudantium consequatur amet qui porro delectus illum voluptates, nemo temporibus quisquam. Ducimus et quis distinctio! Explicabo!</p>

    <va-card style="height: 300px; width: 100%">

    </va-card>
  </va-content>
</template>

<style lang="scss" scoped>
  @keyframes slide {
    // 0% {
    //   left: -100%;
    // }

    0% {
      transform: translateX(-50%)
    }

    100% {
      transform: translateX(100%)
    }
  }

  .va-skeleton {
    & > * {
      --color: var(--va-background-element);

      position: relative;
      display: table;
      box-shadow: none;
      color: var(--color) !important;
      background: var(--color) !important;

      &:is(p) {
        display: inline !important;

        & + * {
          margin-top: 1rem
        }
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      &::after {
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.775), transparent 50%);
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
        animation: slide 3s ease-in-out infinite;
      }
    }
  }
</style>
