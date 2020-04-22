// @ts-nocheck

import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import { getContext } from '../../ui/src/components/context-test/context-provide/context'
import { ContextPlugin } from '../../ui/src/components/context-test/context-provide/ContextPlugin'

Vue.use(InstantSearch)
Vue.use(ContextPlugin, getContext())
