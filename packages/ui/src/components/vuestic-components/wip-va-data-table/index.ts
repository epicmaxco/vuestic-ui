import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaDataTable from './VaDataTable.vue'
import VaDataTableFooterComponent from './VaDataTableFooter.vue'
import DataTableHeader from './DataTableHeader';

export const VaDataTableFooter = withConfigTransport(VaDataTableFooterComponent)
export {
    DataTableHeader,
}

export default withConfigTransport(VaDataTable)
