<template>
  <VbDemo>
    <VbCard style="max-width: 1800px;">
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th>Default</th>
          <th>Dark</th>
        </tr>
        <tr>
          <td>Default</td>
          <td>
            <VbCard>
              <va-card-new class="red">
                <va-card-title>Default card</va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-card-title>Default card</va-card-title>
                <va-card-content>
                  The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project
                </va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Title only</td>
          <td>
            <VbCard>
              <va-card-new>
                <va-card-title title="Title Only Card" />
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-card-title title="Title Only Card" />
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Custom header</td>
          <td>
            <VbCard>
              <va-card-new>
                <va-card-title>
                  <va-icon
                    name="face"
                    color="success"
                  />
                  <h5>Custom Header</h5>
                </va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-card-title>
                  <va-icon
                    name="face"
                    color="success"
                  />
                  <h5>Custom Header</h5>
                </va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Long text in header</td>
          <td>
            <VbCard>
              <va-card-new>
                <va-card-title>
                  Default Card with long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text
                </va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-card-title>
                  Default Card with long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text
                </va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Without header</td>
          <td>
            <VbCard>
              <va-card-new>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills. Various anthropogenic factors have had a severe impact on zebra populations, in particular hunting for skins and habitat destruction. Grévy's zebra and the mountain zebra are endangered. While plains zebras are much more plentiful, one subspecies, the quagga, became extinct in the late 19th century – though there is currently a plan, called the Quagga Project</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>
            With image
            <br>(default image ratio 16:9)
          </td>
          <td>
            <VbCard>
              <va-card-new>
                <va-image src="https://picsum.photos/300/200/?image=1043" />
                <va-card-title>Card with image</va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new dark>
                <va-image src="https://picsum.photos/300/200/?image=1043" />
                <va-card-title>Card with image</va-card-title>
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Background</td>
          <td>
            <VbCard>
              <va-card-new
                color="danger"
                color-gradient
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                color="success"
                color-gradient
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                color="danger"
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
              <va-card-new
                color="success"
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new
                color="danger"
                dark
                color-gradient
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                color="success"
                dark
                color-gradient
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                color="danger"
                dark
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
              <va-card-new
                color="success"
                dark
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Stripes</td>
          <td>
            <VbCard>
              <va-card-new
                stripe
                stripe-color="danger"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                stripe
                stripe-color="success"
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
          <td>
            <VbCard>
              <va-card-new
                dark
                stripe
                stripe-color="danger"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>

              <va-card-new
                dark
                stripe
                stripe-color="success"
                class="mt-2"
              >
                <va-card-content>The unique stripes of zebras make them one of the animals most familiar to people. They occur in a variety of habitats, such as grasslands, savannas, woodlands, thorny scrublands, mountains, and coastal hills.</va-card-content>
              </va-card-new>
            </VbCard>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCardNew from './VaCardNew'
import VaCardTitle from './VaCardTitle'
import VaCardContent from './VaCardContent'
import VaIcon from '../va-icon/VaIcon'
import VaImage from './VaImage'

export default {
  components: {
    VaCardNew,
    VaCardTitle,
    VaCardContent,
    VaIcon,
    VaImage,
  },
}
</script>

<style lang="scss" scoped>
// TODO: PA
.mt-2 {
  margin-top: 1rem;
}

tr {
  td:first-child {
    min-width: 200px;
  }

  td > div {
    background-color: #eeeeee;
  }
}
</style>
