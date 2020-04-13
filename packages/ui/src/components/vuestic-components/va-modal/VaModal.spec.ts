import VaModal from './VaModal.vue'

import { testHasStatefulMixin } from '../../vuestic-mixins/StatefullMixin/testHasStatefulMixin'
import {StatefulMixin} from "../../vuestic-mixins/StatefullMixin/StatefulMixin";

describe('VaModal', () => {
  it('has StatefulMixin', () => {
    expect(() => testHasStatefulMixin((VaModal as unknown) as StatefulMixin)).not.toThrow()
  })
})
