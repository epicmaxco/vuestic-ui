<template>
  <VbDemo>
    <VbCard>
      <va-list fit style="maxWidth: 400px" class="ma-2">
        <va-list-label>
          Avatars
        </va-list-label>

        <va-item>
          <va-item-section avatar>
            <va-avatar>
              <img src="https://randomuser.me/api/portraits/women/5.jpg">
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Image avatars
            </va-item-label>

            <va-item-label caption>
              Great to have pretty faces around
            </va-item-label>
          </va-item-section>
        </va-item>

        <va-list-separator></va-list-separator>

        <va-item>
          <va-item-section avatar>
            <va-avatar textColor="primary" fontSize="20px">
              BA
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Text initials
            </va-item-label>

            <va-item-label caption>
              Works cool for formal things
            </va-item-label>
          </va-item-section>
        </va-item>
        <va-list-separator></va-list-separator>
        <va-item>
          <va-item-section avatar>
            <va-avatar square color="orange" textColor="white">
              CR
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Tucker Kaufman
            </va-item-label>
            <va-item-label caption>
              887 Winthrop Street, Tryon, Florida, 3912
            </va-item-label>
          </va-item-section>
        </va-item>
        <va-item>
          <va-item-section avatar>
            <va-avatar color="grey">
              <va-icon name="material-icons">person_pin</va-icon>
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Even with icon
            </va-item-label>
            <va-item-label caption>
              887 Winthrop Street, Tryon, Florida, 3912
            </va-item-label>
          </va-item-section>
        </va-item>
      </va-list>
    </VbCard>

    <VbCard>
      <va-list fit style="maxWidth: 400px" class="ma-2">
        <va-list-label>
          More customization
        </va-list-label>

        <va-item>
          <va-item-section avatar>
            <va-avatar color="black">
              <img src="./assets/vertical-logo.png">
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Verticaly centered image
            </va-item-label>
          </va-item-section>
        </va-item>

        <va-list-separator></va-list-separator>

        <va-item>
          <va-item-section avatar>
            <va-avatar portrait textColor="primary" color="none" fontSize="20px">
              <img src="./assets/horizontal-logo.png">
            </va-avatar>
          </va-item-section>
          <va-item-section>
            <va-item-label>
              Horizontally centered image
            </va-item-label>
          </va-item-section>
        </va-item>
        <va-list-separator></va-list-separator>
        <va-item>
          <va-item-section avatar>
            <va-avatar color="red" size="large" textColor="white">
              <va-icon name="material-icons">palette</va-icon>
            </va-avatar>
          </va-item-section>

          <va-item-section>
            <va-item-label>
              Something large
            </va-item-label>
          </va-item-section>
        </va-item>
        <va-list-separator></va-list-separator>
        <va-item>
          <va-item-section avatar>
            <va-avatar size="small" color="black" textColor="primary">
              A
            </va-avatar>
          </va-item-section>
          <va-item-section>
            <va-item-label>
              Something small
            </va-item-label>
          </va-item-section>
        </va-item>
      </va-list>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaAvatar from './VaAvatar'
import VaIcon from '../va-icon/VaIcon'
import VaList from '../va-list/VaList'
import VaItem from '../va-list/VaItem'
import VaListSeparator from '../va-list/VaListSeparator'
import VaItemSection from '../va-list/VaItemSection'
import VaListLabel from '../va-list/VaListLabel'
import VaItemLabel from '../va-list/VaItemLabel'

export default {
  components: {
    VaAvatar,
    VaIcon,
    VaList,
    VaItem,
    VaItemSection,
    VaListSeparator,
    VaListLabel,
    VaItemLabel,
  },
}
</script>
