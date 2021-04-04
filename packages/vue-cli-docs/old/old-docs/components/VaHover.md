## Component

* **va-hover**

* component doesn't create wrapper div

***props***

* `value` - Boolean - hover state
* `disabled` - Boolean - hover disabled

## Usage

* use with slot:

```
<va-hover #default="{ hover }">
  <div>{{ hover }}</div>
</va-hover>
```
* or with model
```
<va-hover v-model="hover">
  <div>{{ hover }}</div>
</va-hover>
```

* with disabled property hover won't work
```
<va-hover disabled v-model="hover">
  <div>{{ hover }}</div>
</va-hover>
```
