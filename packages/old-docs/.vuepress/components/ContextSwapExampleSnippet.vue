<template>
  <div class="layout gutter--xl fluid">
    <div class="row justify--space-around">
      <div class="flex xs5">
        <va-list>
          <va-list-item>
            <va-list-item-section avatar>
              <va-badge label="12" overlap>
                <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg"/>
              </va-badge>
            </va-list-item-section>

            <va-list-item-section>
              <va-list-item-label>
                Audrey Clay
              </va-list-item-label>

              <va-list-item-label caption>
                644 Vermont Court, Freelandville, Kentucky, 2619
              </va-list-item-label>
            </va-list-item-section>

            <va-list-item-section side>
              <va-icon name="remove_red_eye" color="gray"/>
            </va-list-item-section>
          </va-list-item>
          <va-list-item>
            <va-list-item-section avatar>
              <va-avatar/>
            </va-list-item-section>

            <va-list-item-section>
              <va-list-item-label>
                Audrey Clay
              </va-list-item-label>

              <va-list-item-label caption>
                644 Vermont Court, Freelandville, Kentucky, 2619
              </va-list-item-label>
            </va-list-item-section>

            <va-list-item-section side>
              <va-icon name="remove_red_eye" color="gray"/>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </div>

      <div class="flex xs5">
        <va-card title="Top contributors">
          <va-button slot="actions" class="mr-0">
            Show all
          </va-button>

          <va-progress-bar
            class="mt-4"
            :value="sliderValue"
          />

          <va-slider
            class="mt-4"
            value-visible
            v-model="sliderValue"
            :step="5"
            :min="0"
            :max="100"
          />
        </va-card>
      </div>

      <div class="flex xs11">
        <va-card title="Create connection">
          <div class="title mb-3">
            Personal info
          </div>
          <va-input
            label="First name"
            v-model="form.name"
          />
          <va-input
            label="Last name"
            v-model="form.email"
          />
          <va-input
            label="Billing address"
            v-model="form.address"
          />

          <div class="title mb-3">
            Company info
          </div>
          <va-input
            label="City"
            v-model="form.city"
          />
          <va-input
            label="Label"
            v-model="form.country"
          />
          <va-checkbox
            label="Infinite connections"
            v-model="form.connection"
          />
          <div class="row justify--center">
            <va-button>
              Add Connection
            </va-button>
          </div>
        </va-card>
      </div>

      <div class="flex xs11">
        <va-card title="Image list">
          <va-file-upload v-model="images"/>

          <va-pagination v-model="page" :pages="20"/>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import VaList from '../../../ui/src/components/vuestic-components/va-list/VaList'
import VaListItem from '../../../ui/src/components/vuestic-components/va-list/VaListItem'
import VaAvatar
  from '../../../ui/src/components/vuestic-components/va-avatar/VaAvatar'
import VaListItemSection
  from '../../../ui/src/components/vuestic-components/va-list/VaListItemSection'
import VaListItemLabel
  from '../../../ui/src/components/vuestic-components/va-list/VaListItemLabel'
import VaIcon from '../../../ui/src/components/vuestic-components/va-icon/VaIcon'
import VaBadge
  from '../../../ui/src/components/vuestic-components/va-badge/VaBadge'
import VaCard from '../../../ui/src/components/vuestic-components/va-card/VaCard'
import VaButton
  from '../../../ui/src/components/vuestic-components/va-button/VaButton'
import VaProgressBar
  from '../../../ui/src/components/vuestic-components/va-progress-bar/progress-types/VaProgressBar'
import VaInput
  from '../../../ui/src/components/vuestic-components/va-input/VaInput'
import VaSlider
  from '../vuestic-ui/src/components/vuestic-components/va-slider/VaSlider'
import VaPagination
  from '../../../ui/src/components/vuestic-components/va-pagination/VaPagination'
import VaCheckbox
  from '../../../ui/src/components/vuestic-components/va-checkbox/VaCheckbox'
import VaFileUpload
  from '../../../ui/src/components/vuestic-components/va-file-upload/VaFileUpload'

export default {
  components: {
    VaFileUpload,
    VaCheckbox,
    VaPagination,
    VaSlider,
    VaInput,
    VaProgressBar,
    VaButton,
    VaCard,
    VaBadge,
    VaIcon,
    VaListItemLabel,
    VaListItemSection,
    VaAvatar,
    VaListItem,
    VaList,
  },
  data () {
    return {
      sliderValue: 25,
      page: 3,
      form: {
        name: 'John Smith',
        email: 'smith@gmail.com',
        address: '93  Guild Street',
        city: 'London',
        country: 'United Kingdom',
        connection: true,
      },
      images: [
        {
          name: 'xxx.png',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          url: 'https://via.placeholder.com/150',
          size: 15000,
        },
      ],
    }
  },
}
</script>
