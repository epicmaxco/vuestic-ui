// @ts-nocheck

import Vue from 'vue'
import { getContext } from '../../ui/src/components/context-test/context-provide/context'
import { ContextPlugin } from '../../ui/src/components/context-test/context-provide/ContextPlugin'

Vue.use(ContextPlugin, getContext())
