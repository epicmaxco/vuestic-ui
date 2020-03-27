<template>
  <VbDemo>
    <VbCard>
      <va-input
        type="number"
        v-model.number="activePage"
        label="Current Page"
      />
    </VbCard>
    <VbCard>
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th>Va Pagination</th>
        </tr>
        <tr>
          <td>Default Pagination</td>
          <td>
            <VbCard>
              <va-pagination
                :pages="20"
                v-model="activePage"
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Pagination With Visible Pages</td>
          <td>
            <VbCard>
              <va-pagination
                :pages="10"
                :visible-pages="3"
                v-model="activePage"
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Pagination Sizes</td>
          <td>
            <VbCard>
              <va-pagination
                size="small"
                :pages="10"
                :visible-pages="3"
                v-model="activePage"
              />
              <va-pagination
                size="large"
                :pages="10"
                :visible-pages="3"
                v-model="activePage"
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Colored Pagination</td>
          <td>
            <VbCard>
              <va-pagination
                v-model="activePage"
                :visible-pages="4"
                :pages="15"
                color="info"
              />
              <va-pagination
                v-model="activePage"
                :visible-pages="4"
                :pages="15"
                color="danger"
              />
              <va-pagination
                v-model="activePage"
                :visible-pages="4"
                :pages="15"
                color="warning"
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Disabled Pagination</td>
          <td>
            <VbCard>
              <va-pagination
                v-model="activePage"
                :visible-pages="4"
                :pages="15"
                disabled
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Pagination Without Links</td>
          <td>
            <VbCard>
              <va-pagination
                :pages="10"
                :visible-pages="3"
                :boundary-links="false"
                v-model="activePage"
              />
              <va-pagination
                :pages="10"
                :visible-pages="3"
                :direction-links="false"
                v-model="activePage"
              />
            </VbCard>
          </td>
        </tr>
        <tr>
          <td>Pagination With Icons</td>
          <td>
            <VbCard>
              <va-pagination
                :pages="10"
                :visible-pages="3"
                :icon-set="{ direction: 'volume_mute' }"
                :icon-set-right="{ direction: 'volume_down' }"
                v-model="activePage"
              />
              <va-pagination
                :pages="10"
                :visible-pages="3"
                :icon-set="{ boundary: 'volume_off' }"
                :icon-set-right="{ boundary: 'volume_up' }"
                v-model="activePage"
              />
              <va-pagination
                :pages="10"
                :visible-pages="3"
                :icon-set="{ boundary: 'volume_off', direction: 'volume_mute' }"
                :icon-set-right="{ boundary: 'volume_up', direction: 'volume_down' }"
                v-model="activePage"
              />
            </VbCard>
          </td>
        </tr>
      </table>
    </VbCard>
    <VbCard
      title="With input"
    >
      <va-pagination
        :pages="20"
        v-model="activePage"
        input
      />
    </VbCard>
    <VbCard
      title="With boundary numbers"
    >
      <va-pagination
        :pages="20"
        :visible-pages="7"
        v-model="activePage"
        boundary-numbers
      />
    </VbCard>
    <VbCard
      title="Flat"
    >
      <va-pagination
        :pages="20"
        v-model="activePage"
        flat
      />
    </VbCard>
    <VbCard
      title="Flat with input"
    >
      <va-pagination
        :pages="20"
        v-model="activePage"
        flat
        input
      />
    </VbCard>
    <VbCard
      title="Should hide if 1 page only"
    >
      <va-pagination
        :pages="1"
        v-model="activePage"
        hide-on-single-page
      />
    </VbCard>
    <VbCard
      title="Use total and page-size"
      style="width: 600px;"
    >
      <va-select
        width='200px'
        :options="pageSizes"
        v-model="pageSize"
        no-clear
      />
      <va-pagination
        :total="100"
        v-model="activeTotalPage"
        :page-size="+pageSize"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaPagination from './VaPagination'
import VaInput from '../va-input/VaInput'
import VaSelect from '../va-select/VaSelect'

export default {
  components: {
    VaPagination,
    VaInput,
    VaSelect,
  },
  data () {
    return {
      activePage: 4,
      pageSizes: ['10', '20', '30', '40'],
      activeTotalPage: 3,
      pageSize: '10',
    }
  },
}
</script>
