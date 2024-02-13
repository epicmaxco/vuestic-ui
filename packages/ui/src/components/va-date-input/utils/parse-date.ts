export const isISO8601 = (date: string) => {
  const isoDate = Date.parse(date)

  return !isNaN(isoDate) && !date.includes(' ')
}

export const isRFC1123GTM = (date: string) => {
  return date.endsWith('GMT')
}

export const isRFC1123 = (date: string) => {
  const rfcDate = new Date(date)

  return !isNaN(rfcDate.getTime())
}

export const formatDateToTheSameStandardFormat = (date: Date, formattedString: string) => {
  if (isRFC1123GTM(formattedString)) {
    return date.toUTCString()
  }

  if (isISO8601(formattedString)) {
    return date.toISOString()
  }

  if (isRFC1123(formattedString)) {
    return date.toString()
  }

  return null
}

/** Handle ISO8601 and RFC1123 standard JS dates */
export const parseDate = (date: string) => {
  // Parse ISO 86801 dates
  const isoDate = Date.parse(date)

  if (!isNaN(isoDate)) {
    return new Date(isoDate)
  }

  // Parse legacy RFC1123 dates
  const rfcDate = new Date(date)

  if (!isNaN(rfcDate.getTime())) {
    return rfcDate
  }

  return null
}
