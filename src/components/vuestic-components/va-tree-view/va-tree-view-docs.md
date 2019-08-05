## Components

* **va-tree-root**
* **va-tree-category**
* **va-tree-node**

Here's the general example:
```html
  <va-tree-root>
      <va-tree-category label="Electronics">
        <va-tree-node>Cellphones</va-tree-node>
      </va-tree-category>
      <va-tree-category isOpen label="Products">
        <va-tree-category label="Cables">
          <va-tree-node>Audio</va-tree-node>
          <!-- va-tree-node items -->
        </va-tree-category>
        <va-tree-node>Monitors</va-tree-node>
      </va-tree-category>
      <!-- va-tree-category items -->
    </va-tree-root>
```
# va-tree-root

No props

# va-tree-category

### Props
* `label` - String, Number - label of the category
* `isOpen` - Boolean - default state of category
* `icon` - String - set a icon before the label

# va-tree-node

### Props
* `hightlighted` - Boolean - highlight the label of node
* `icon` - String - name of icon at the _left_ of node
* `iconRight` - String - name of icon at the _right_ of node

### Slots 
* ***Components `va-tree-category`, `va-tree-node`***
* `checkbox`
--------------


[Find DEMOs here!](http://vuestic.epicmax.co/#/admin/ui/tree-view)


