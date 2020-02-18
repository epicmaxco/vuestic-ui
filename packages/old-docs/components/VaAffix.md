# va-divider

```html
<va-affix :offset-top="100">
  <div>Fixed at the top: 100</div>
</va-affix>

<va-affix :offset-bottom="100">
  <div>Fixed at the bottom: 100</div>
</va-affix>

<va-affix :target="customTarget" :offset-bottom="0" :offset-top="50">
  <div>Fixed at custom position of a custom target</div>
</va-affix>

<va-affix @change="handleAffixedStateChange">
  <div>Fixed at the default position</div>
  <div>Affixed state: {{ affixedState }}</div>
</va-affix>
``` 

### Props
* `offset-top: Number` - pixels to offset from top when calculating position of scroll
* `offset-bottom: Number` - pixels to offset from bottom when calculating position of scroll

### Events
* `change` - emit when an affix state changes
