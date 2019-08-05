## Components

* **va-accordion**
* **va-collapse**

# va-accordion

Accordion is a component which organizes content within collapsable items. Accordions can toggle through a number of text blocks with a single click.

```html
      <va-accordion>
        <va-collapse>
          <span slot="header"> Expand This Block </span>
          <div slot="body">
            Expand first content
          </div>
        </va-collapse>
        <!-- va-collapse items -->    
      </va-accordion>
```  

# va-collapse

Collapse is a component which provides possibility to toggle the visibility of content across your project.

```html
        <va-collapse>
          <span slot="header"> Expand This Block </span>
          <div slot="body">
            <div>
              Expand first content
            </div>
          </div>
        </va-collapse>
```

### Props
* `isOpenDefault` - Boolean (default: false) - open collapse by default
* `withBackground` - Boolean (default: false) - add background color to collapse content
* `customHeader` - Boolean (default: false) - add possibility to set your custom header (for example button)

[Find DEMOs here!](https://vuestic.epicmax.co/#/admin/ui/collapse)
