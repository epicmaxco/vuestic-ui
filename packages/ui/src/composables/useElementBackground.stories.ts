import { defineComponent } from 'vue'
import { useElementBackground } from './useElementBackground'
import { useCurrentElement } from './useCurrentElement'

export default {
  title: 'composables/useElementBackground',
}

export const Default = () => ({
  data () {
    return {
      styles: {
        background: '#000',
        color: '#fff',
      },
    }
  },

  setup () {
    return {
      color: useElementBackground(useCurrentElement()),
    }
  },

  template: `
<div :style="{ ...styles }">
  <button @click="styles = { background: '#000', color: '#fff' }">Black</button>
  <button @click="styles = { background: '#fff', color: '#000' }">White</button>

  <div>Current color: {{ color }}</div>
</div>
`,
})

export const WithTransition = () => ({
  data () {
    return {
      styles: {
        background: '#000',
        color: '#fff',
      },
    }
  },

  setup () {
    return {
      color: useElementBackground(useCurrentElement()),
    }
  },

  template: `
<div :style="{ ...styles, transition: 'all 0.5s ease-in-out' }">
  <button @click="styles = { background: '#000', color: '#fff' }">Black</button>
  <button @click="styles = { background: '#fff', color: '#000' }">White</button>

  <div>Current color: {{ color }}</div>
</div>
`,
})

export const WithOpacity = () => ({
  data () {
    return {
      styles: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
      },
    }
  },

  setup () {
    return {
      color: useElementBackground(useCurrentElement()),
    }
  },

  template: `
<div :style="{ ...styles }">
  <button @click="styles = { background: 'rgba(0, 0, 0, 0.5)', color: '#fff' }">Black</button>
  <button @click="styles = { background: 'rgba(255, 255, 255, 0.5)', color: '#000' }">White</button>

  <div>Current color: {{ color }}</div>
</div>
`,
})

export const WithOpacityAndParentWithDynamicBg = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)" >Current color: {{ color }}</div>',
    }),
  },

  template: `
<div :style="{ ...styles, color: '#fff' }">
  <button @click="styles = { background: 'red', color: '#fff' }">Red</button>
  <button @click="styles = { background: 'blue', color: '#000' }">Blue</button>

  <Child />
</div>
`,
})

export const MultipleParentWithDynamicBg = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)" >Current color: {{ color }}</div>',
    }),
  },

  template: `
  <div style="background: rgba(255, 255, 255, 0.5)">
    <div :style="{ ...styles, color: '#fff' }">
      <button @click="styles = { background: 'rgba(255, 0, 0, 0.3)' }">Red</button>
      <button @click="styles = { background: 'rgba(0, 0, 255, 0.3)' }">Blue</button>

      <Child />
      <div style="background: rgba(255, 255, 0, 0.5)">
        <Child />
      </div>
    </div>
  </div>
`,
})

export const WithOpacityAndWillChange = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)">Current color: {{ color }}</div>',
    }),
  },

  template: `
<div :style="{ ...styles, willChange: 'background' }">
  <button @click="styles = { background: 'red', color: '#fff' }">Red</button>
  <button @click="styles = { background: 'rgba(0, 0, 255, 0.5)', color: '#fff' }">Transparent Blue</button>

  <Child />
</div>
`,
})
