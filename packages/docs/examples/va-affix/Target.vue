<template>
  <div style="height: 300px; overflow-y: scroll;" ref="target">
    <p>
      {{text}}
    </p>
    <va-affix :offset-top="30" :offset-bottom="0" :target="()=>$refs.target">
      <div style="padding: 10px 30px; background-color: lightblue;">
        Custom target: top 30, bottom 0.
      </div>
    </va-affix>
    <p>
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: Array(100)
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
        .join(' '),
    }
  },
}
</script>
