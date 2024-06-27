const times = (n: number, fn: () => any) => Array.from({ length: n }, fn)

export const getInitialRecords = (amount = 50) => times(amount, () => ({ text: 'record', id: Math.random() }))

export const getNewRecords = (amount = 5) => times(amount, () => ({ text: 'new record', id: Math.random() }))
