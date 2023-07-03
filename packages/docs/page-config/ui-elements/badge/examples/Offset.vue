<template>
  <div
    class="flex gap-8 items-center"
  >
    <va-badge
      placement="bottom-end"
      text="99+"
      offset="1rem"
      color="#B3D943"
    >
      <va-button size="small">
        bottom-end 1rem
      </va-button>
    </va-badge>

    <va-badge
      placement="top-end"
      text="99+"
      offset="-10px"
      color="#B3D943"
    >
      <va-button size="small">
        top-end -10px
      </va-button>
    </va-badge>

    <va-badge
      placement="bottom"
      text="99+"
      offset="5px"
      color="#B3D943"
    >
      <va-button size="small">
        bottom 5px
      </va-button>
    </va-badge>
  </div>
</template>