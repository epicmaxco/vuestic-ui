## Components

* **va-file-upload**
* **va-file-upload-list**
* **va-file-upload-list-item**
* **va-file-upload-gallery-item**
* **va-file-upload-single-item**
* **va-file-upload-undo**

# va-file-upload

```html
<va-file-upload 
 type="gallery"
 dropzone
 v-model="advancedGallery"
/>
```

### Props
* `value` - Array - array of uploaded files. Required prop.
    Array can include also already uploaded files. Object should have structure as below:
    * `url` - required
    * `name` - optional
    * `size` - optional
* `type` - String (default: 'list') - Switch the displaying of file upload (possible values: `list` - list of files under the button; `gallery` - list of previews; `single` - possible to upload only one file)
* `dropzone` - Boolean (default: false) - Turn on/off drag'n'drop area around the main button
* `fileTypes` - String - list of file types, that can be uploaded (for example '.png, .jpg, .jpeg, .gif')

# va-file-upload-list

### Props
* `type` - String. 
* `files` - Array.
* `color` - String (default: 'success').

# va-file-upload-list-item

### Props
* `file` - Object.
* `color` - String (default: 'success').

# va-file-upload-gallery-item

### Props 
* `file` - Object.
* `color` - String (default: 'success').

# va-file-upload-single-item

### Props
* `file` - Object. 

# va-file-upload-undo

No props

[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/file-upload)
 
