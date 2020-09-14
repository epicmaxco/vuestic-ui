<template>
  <VbDemo>
    <VbCard title="Sidebar" style="width: 100%; height: 80%; background-color: #f1f1f1;">
      <div style="display: block; position: relative; width: 40rem; height: 90%; background: linear-gradient(45deg, grey, transparent);">

        <!-- DEFAULT -->
        <va-sidebar
          style="height: auto;"
          color="secondary"
        >
          <template>
            <va-list style="background: inherit;">
              <va-list-item>
                <va-list-item-section icon>
                  <va-icon
                    class="fa fa-bars"
                    color="gray"
                  />
                </va-list-item-section>
              </va-list-item>
              <va-list-item>
                <va-list-item-section icon>
                  <va-icon
                    name="home"
                    color="gray"
                  />
                </va-list-item-section>
              </va-list-item>
              <va-list-item>
                <va-list-item-section icon>
                  <va-icon
                    name="battery"
                    color="gray"
                  />
                </va-list-item-section>
              </va-list-item>
            </va-list>
          </template>
        </va-sidebar>

      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSidebar from '../va-app-bar/VaAppBar'
import VaList from '../va-list/VaList'
import VaListItem from '../va-list/VaListItem'
import VaListItemSection from '../va-list/VaListItemSection'
import VaIcon from '../va-icon/VaIcon'

export default {
  components: {
    VaSidebar,
    VaIcon,
    VaList,
    VaListItem,
    VaListItemSection,
  },
  data () {
    return {
      icon: 'info_outline',
      theme: 'info',
    }
  },
}
</script>
