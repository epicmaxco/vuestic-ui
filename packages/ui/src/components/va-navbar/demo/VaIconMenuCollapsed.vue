<template>
  <svg
    class="va-icon-menu-collapsed"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g v-if="collapsed" fill="none" fill-rule="nonzero">
      <path d="M0 0h24v24H0z"></path>
      <rect width="20" height="2" x="2" y="3" fill="white" rx="1"></rect>
      <path
        fill="white"
        d="M3 11h10a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zM20.993 11l-2.7-2.7-1.414 1.414L18.164 11H16a1 1 0 0 0 0 2h2.179l-1.3 1.3 1.414 1.414L21.007 13A1 1 0 0 0 21 11h-.007z"
      ></path>
      <rect width="20" height="2" x="2" y="19" fill="white" rx="1"></rect>
    </g>
    <g v-else fill="none" fill-rule="nonzero">
      <path d="M0 0h24v24H0z"></path>
      <rect width="20" height="2" x="2" y="3" fill="white" rx="1"></rect>
      <path
        fill="white"
        d="M11 11h10a1 1 0 0 1 0 2H11a1 1 0 0 1 0-2zM1 11h5a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z"
      ></path>
      <rect width="20" height="2" x="2" y="19" fill="white" rx="1"></rect>
      <path stroke="white" stroke-width="2" d="M4 9l-3 3 3 3"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'VaIconMenuCollapsed',
  props: {
    color: {
      type: String,
      default: 'white',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.va-icon-menu-collapsed {
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>
