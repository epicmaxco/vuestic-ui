import { times } from 'lodash'

export const getInitialRecords = () => times(20, () => ({ text: 'record', id: Math.random() }))

export const getNewRecords = () => times(10, () => ({ text: 'new record' })).map(record => ({
  ...record,
  id: Math.random(),
}))
