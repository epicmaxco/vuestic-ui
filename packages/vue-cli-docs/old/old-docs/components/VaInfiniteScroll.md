# va-infinite-scroll

```html
<div class="scroll__container" ref="scrollContainer">
  <va-infinite-scroll
    :debounce="300"
    :offset="1"
    :scroll-target="$refs.scrollContainer"
    :disabled="false"
    :load="appendRecords"
    tag="ul"
  >
    <li v-for="(record, index) in records" :key="record.id">
      {{record.text}} #{{index}}
    </li>
    <template #loading>
      <spring-spinner
        :animation-duration="2000"
        :size="48"
        color="primary"
      />
    </template>
  </va-infinite-scroll>
</div>
```

# Props

* `offset: Number` - offset (pixels) to bottom of Infinite Scroll container from which the component should start loading more content in advance
* `reverse: Boolean` - scroll area starting scrolled to bottom and loading when reaching the top
* `disabled: Boolean` - disables load event emiting onscroll
* `scroll-target: Element | String` - CSS selector or DOM element to be used as scroll container
* `debounce: Number` - default: 100 - debounce amount (in milliseconds)
* `load: Function` - accepts async function, that loads data
* `tag: String` - default: div - tag type of infinite scroll component root element (to fit semantics)

# Slots

* `default` - slot for scrolled content
* `loading` - expected: `spinner` - slot displaying something while loading content

# Example of loading method


```typescript
    appendRecordsAsync () {
      return sleep(2000).then(() => {
        this.records.push(...this.getNewRecords())
      })
    },
```
