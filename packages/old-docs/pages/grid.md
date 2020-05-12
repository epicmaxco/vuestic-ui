Main container - **`va-layout`**
```html
<div class="va-layout gutter--md">
   <div class="va-row">
     <div class="flex">
       Grid sizes
     </div>
   </div>
   <div class="va-row row wrap">
     <div class="flex xs12">
       <div class="_blue-rectangle">
            12
       </div>
     </div>
   </div
</div>
```
# List of displays

| Prefix        | Description                
| ------------- |:-----------------------------:        |
| **`xs`**          | Phones (<600px)                       |
| **`sm`**          | Small devices Tablets (≥600px)        |
| **`md`**          | Medium devices Desktops (≥960)        |
| **`lg`**          | Large devices Desktops (≥1280px)      |
| **`xl`**          | Extra large devices Desktops (≥1920px)|

**`va-layout`** can be used for a center focused page, or considering that **`fluid`** prop expands its full width. **`va-row`** is used for partitioning and contains v-flex.

# BreakPoints

You can use our **`breakpoints`** to set the length of you container:

Example:

```html
<div class="va-row">
  <div class="flex xs2 md4">
    <div class="_green-rectangle">xs2 md4</div>
  </div>
  <div class="flex xs8 md4">
    <div class="_green-rectangle">xs8 md4</div>
  </div>
  <div class="flex xs2 md4">
    <div class="_green-rectangle">xs2 md4</div>
  </div>
</div>
```
# Offsets

You can use our **`offset`** to set the space between left and current elements of you container:

Example

```html
<div class="va-row">
  <div class="flex xs1 offset--md3 offset--lg2">
    <div class="_blue-rectangle">
           First
    </div>
  </div>
  <div class="flex xs1 offset--md1 offset--lg3">
    <div class="_blue-rectangle">
          Second
    </div>
  </div>
  <div class="flex xs1 offset--md2 offset--lg1">
    <div class="_blue-rectangle">
          Last
    </div>
  </div>
</div>
```


# Gutters

**`va-layout`** controls by **`gutter`**, which can be:

| Class Name                    | Description                
| -------------             |:-----------------------------:        |
| **`gutter--xs`**          | Extra small gutter between cells      |
| **`gutter--sm`**          | Small gutter between cells            |
| **`gutter--md`**           | Default gutter between cells          |
| **`gutter--lg`**          | Large gutter between cells            |
| **`gutter--xl`**          | Extra large gutter between cells      |

Exmaple:

```html
<div class="va-layout gutter--md">
      <div class="va-row">
        <div class="flex">
          Grid sizes
        </div>
      </div>
</div>
```

# API:
**align**:
* **`align--start`** - cross-start margin edge of the items is placed on the cross-start line
* **`align--end`** - cross-end margin edge of the items is placed on the cross-end line
* **`align--center`** - items are centered in the cross-axis`
* **`align--baseline`** - items are aligned such as their baselines align

**align-self** property accepts the same 5 values as the align-items:
* **`align-self--start`**
* **`align-self--end`**
* **`align-self--center`**
* **`align-self--baseline`**

**align-content**:
* **`align-content--start`** - lines packed to the start of the container
* **`align-content--end`** - lines packed to the end of the container
* **`align-content--center`** - lines packed to the center of the container
* **`align-content--space-between`** - lines evenly distributed; the first line is at the start of the container while the last one is at the end
* **`align-content--space-around`** - lines evenly distributed with equal space between them

**justify**:
* **`justify--start`** -  items are packed toward the start line
* **`justify--end`** - items are packed toward to end line
* **`justify--center`** - items are centered along the line
* **`justify--space-around`** - items are evenly distributed in the line with equal space around them
* **`justify--space-between`** - items are evenly distributed in the line; first item is on the start line, last item on the end line

**justify-self**:
* **`justify-self--start`** - The item is packed flush to each other toward the start edge of the alignment container in the appropriate axis.
* **`justify-self--end`** - The item is packed flush to each other toward the end edge of the alignment container in the appropriate axis.
* **`justify-self--center`** - For items that are not children of a flex container, this value is treated like `start`.
* **`justify-self--baseline`**
