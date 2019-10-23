## va-input

```html
<va-input
  v-model="empty"
  placeholder="Name"
/>

<va-input
 v-model="text"
 label="Name"
 removable
 success
 :messages="successMessages"
/>

<va-input
 v-model="text"
 label="Name"
 type="textarea"
 :minRows="3"
 :maxRows="8"
/>
```

```javascript
export default {
  data () {
    return {
      empty: '',
      text: 'Vuestic Line',
      messages: ['Required field']
    }
  },
}
```

### Props
* `value` - String | Number.
* `label` - String.
* `placeholder` - String.
* `type` - String (default: 'text').
* `disabled` - Boolean.
* `readonly` - Boolean.
* `removable` - Boolean.
* `autosize` (textarea-specific) - Boolean
* `min-rows` (textarea-specific) - Number
* `max-rows` (textarea-specific) - Number

## va-input-wrapper

```html
<va-input-wrapper :messages="messages">
 <div slot="prepend" class="flex-center">
   <va-icon name="fa fa-volume-off"/>
 </div>
 <div>Default Slot</div>
 <div slot="append" class="flex-center">
   <va-icon name="fa fa-volume-up"/>
 </div>
</va-input-wrapper>

<va-input-wrapper :messages="messages">
  <va-checkbox name="agree-to-terms" v-model="agreedToTerms">
    <template slot="label">
      I agree to
      <a class="link" href="javascript:void(0);">Terms of use.</a>
    </template>
  </va-checkbox>
</va-input-wrapper>
```

### Props
* `disabled` - Boolean.
* `error` - Boolean.
* `success` - Boolean.
* `messages` - Array
* `error-messages` - Array
* `error-count` - Number
 
