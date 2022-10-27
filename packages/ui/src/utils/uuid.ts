const getRandomString = (stringLength = 4): string => {
  return Math.random().toString(36).substring(2, stringLength + 2)
}

export const generateUniqueId = () => {
  return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}`
}
