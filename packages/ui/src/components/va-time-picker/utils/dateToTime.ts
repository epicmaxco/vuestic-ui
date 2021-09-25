export const dateToTime = (date: Date) => {
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return { h, m, s }
}
