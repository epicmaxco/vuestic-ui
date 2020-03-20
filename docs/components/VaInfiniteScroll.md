# va-infinite-scroll

```html
<div class="scroll__container" ref="scrollContainer">
  <va-infinite-scroll
    :debounce="300"
    :offset="1"
    :scroll-target="$refs.scrollContainer"
    :disabled="false"
    @load="appendRecords"
  >
    <ul>
      <li v-for="(record, index) in records" :key="record.id">
        {{record.text}} #{{index}}
      </li>
    </ul>
    <template v-slot:loading>
      <spring-spinner
        :animation-duration="2000"
        :size="48"
        :color="$themes.primary"
      />
    </template>
  </va-infinite-scroll>
</div>
```

# Props

- [ ] `offset: Number` - offset (pixels) to bottom of Infinite Scroll container from which the component should start loading more content in advance
- [ ] `reverse: Boolean` - scroll area starting scrolled to bottom and loading when reaching the top
- [ ] `disabled: Boolean` - disables load event emiting onscroll
- [ ] `scroll-target: Element | String` - CSS selector or DOM element to be used as scroll container
- [ ] `debounce: Number` - default: 100 - debounce amount (in milliseconds)

# Slots

- [ ] `default` - slot for scrolled content
- [ ] `loading` - expected: `spinner` - slot displaying something while loading content

# Events

- [ ] `load` - emitted when infinite scroll needs to load more data, comes with callback to stop loading after new data received.

```typescript
    appendRecords(done) {
      setTimeout(() => {
        this.records.push(...this.getNewRecords());
        done();
      }, 2000);
    },
```
