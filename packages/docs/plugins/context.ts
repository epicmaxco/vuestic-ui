// @ts-nocheck

import Vue from 'vue'
import { getContext } from '../../ui/src/components/context-test/context-provide/context'
import { ContextPlugin } from '../../ui/src/components/context-test/context-provide/ContextPlugin'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);
Vue.use(ContextPlugin, getContext())