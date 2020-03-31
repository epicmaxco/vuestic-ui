```html
<va-medium-editor :editor-options="editorOptions">
  <h1>Some title</h1>
  <p>the text of article</p>
</va-medium-editor>
```

```javascript
export default {
  data () {
    return {
      editorOptions: {
        buttonLabels: 'fontawesome',
        autoLink: true,
        toolbar: {
          buttons: [
           'bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3'
          ]
        }
     }
  }
}
```


### Props
* `editorOptions` - Object (see default options above).

`va-medium-editor` uses external lib with overridden styles. Check more information [here](https://yabwe.github.io/medium-editor/)

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/forms/medium-editor)
