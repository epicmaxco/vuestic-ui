<template>
  <VbDemo>
    <va-list fit>
      <va-list-label>
        Basic
      </va-list-label>

      <va-list-item>
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/women/5.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Audrey Clay
          </va-list-item-label>

          <va-list-item-label caption>
            644 Vermont Court, Freelandville, Kentucky, 2619
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>

      <va-list-separator />

      <va-list-item>
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/men/3.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Aguirre Klein
          </va-list-item-label>

          <va-list-item-label caption>
            626 Carroll Street, Roulette, Ohio, 1477
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>

      <va-list-separator spaced />

      <va-list-label color="warning">
        Warning
      </va-list-label>

      <va-list-item>
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/men/1.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Tucker Kaufman
          </va-list-item-label>

          <va-list-item-label caption>
            887 Winthrop Street, Tryon, Florida, 3912
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>
      <va-list-label>
        Disabled
      </va-list-label>

      <va-list-item disabled>
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/men/5.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Herbert Keller
          </va-list-item-label>

          <va-list-item-label caption>
            286 NW. Shore St.Longwood, FL 32779
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>

    <va-list>
      <va-list-label>
        Aligned, Clickable
      </va-list-label>

      <va-list-item clickable>
        <va-list-item-section icon>
          <va-icon
            name="star"
            color="warning"
          />
        </va-list-item-section>

        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/women/5.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Audrey Clay
          </va-list-item-label>

          <va-list-item-label caption>
            644 Vermont Court, Freelandville, Kentucky, 2619
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>

      <va-list-separator />

      <va-list-item clickable>
        <va-list-item-section icon />

        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/men/3.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Aguirre Klein
          </va-list-item-label>

          <va-list-item-label caption>
            626 Carroll Street, Roulette, Ohio, 1477
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>
    <va-list>
      <va-list-label>
        Router Support
      </va-list-label>

      <va-list-item to="/foo">
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/women/5.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Audrey Clay
          </va-list-item-label>

          <va-list-item-label caption>
            644 Vermont Court, Freelandville, Kentucky, 2619
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>

      <va-list-separator />

      <va-list-item to="/bar">
        <va-list-item-section avatar>
          <va-avatar>
            <img src="https://randomuser.me/api/portraits/men/3.jpg">
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Aguirre Klein
          </va-list-item-label>

          <va-list-item-label caption>
            626 Carroll Street, Roulette, Ohio, 1477
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="gray"
          />
        </va-list-item-section>
      </va-list-item>
    </va-list>

    <va-list>
      <va-list-label>
        Selectable
      </va-list-label>

      <va-list-item>
        <va-list-item-section icon>
          <va-checkbox v-model="check1" />
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Audrey Clay
          </va-list-item-label>
        </va-list-item-section>
      </va-list-item>

      <va-list-item>
        <va-list-item-section icon>
          <va-checkbox v-model="check2" />
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            Aguirre Klein
          </va-list-item-label>
        </va-list-item-section>
      </va-list-item>
    </va-list>

    <DividerWithList />
  </VbDemo>
</template>

<script>
import VaList from './VaList'
import VaListLabel from './VaListLabel'
import VaListItem from './VaListItem'
import VaListItemSection from './VaListItemSection'
import VaListSeparator from './VaListSeparator'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaListItemLabel from './VaListItemLabel'
import VaAvatar from '../va-avatar/VaAvatar'
import VaIcon from '../va-icon/VaIcon'
import DividerWithList from '../va-divider/DividerWithList'

export default {
  components: {
    DividerWithList,
    VaIcon,
    VaAvatar,
    VaListItemLabel,
    VaCheckbox,
    VaListSeparator,
    VaListItemSection,
    VaListItem,
    VaListLabel,
    VaList,
  },
  data () {
    return {
      appBanners: false,
      banners: false,
      check1: true,
      check2: false,
    }
  },
}
</script>

<style lang="scss">

</style>
