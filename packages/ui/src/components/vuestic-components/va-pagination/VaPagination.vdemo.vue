<template>
  <VbDemo>
    <VbCard>
      Current Page
      <input
        type="number"
        v-model.number="activePage"
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
                :pages="5"
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
                direction-icon-left='volume_mute'
                direction-icon-right='volume_down'
                v-model="activePage"
              />
              <va-pagination
                :pages="10"
                :visible-pages="3"
                boundary-icon-left='volume_off'
                boundary-icon-right='volume_up'
                v-model="activePage"
              />
              <va-pagination
                :pages="10"
                :visible-pages="3"
                boundary-icon-left='volume_off'
                boundary-icon-right='volume_up'
                direction-icon-right='volume_down'
                direction-icon-left='volume_mute'
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
        :visible-pages="5"
        v-model="activePage"
        boundary-numbers
      />
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
        :visible-pages="5"
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
        :visible-pages="5"
        input
      />
    </VbCard>
    <VbCard
      title="Hide on single page"
    >
      <va-pagination
        :pages="1"
        hide-on-single-page
      />
    </VbCard>
    <VbCard
      title="Stateful"
    >
      <va-pagination
        :pages="10"
        stateful
        :visible-pages="5"
      />
    </VbCard>
    <VbCard
      title="Use context"
    >
      <va-context :config="{
        VaPagination: {
          color: 'danger',
          pages: 10,
          disabled: true,
          visiblePages: 3,
          input: true,
        }
      }">
        <va-pagination />
      </va-context>
      <va-context :config="{
        VaPagination: {
          color: 'info',
          size: 'small',
          boundaryNumbers: true,
          flat: true,
          pages: 10,
          visiblePages: 5,
        }
      }">
        <va-pagination v-model="activePage" />
      </va-context>
    </VbCard>
    <VbCard
      title="Use total and page-size"
    >
      <div>
        Page size
        <input type="number" v-model.number="pageSize">
      </div>
      <div>
        Total
        <input type="number" v-model.number="total">
      </div>
      <va-pagination
        :visible-pages="5"
        v-model="activeTotalPage"
        :total="total"
        boundary-numbers
        :page-size="pageSize"
      />
      <div>
        value: {{activeTotalPage}}
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaPagination from './index'
import VaContext from '../va-config'

export default {
  components: {
    VaPagination,
    VaContext,
  },
  data () {
    return {
      activePage: 4,
      pageSizes: ['10', '20', '30', '40'],
      activeTotalPage: 3,
      pageSize: 10,
      total: 100,
    }
  },
}
</script>
