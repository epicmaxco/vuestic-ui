export const sortObject = (obj: any) => {
  const arrFromObj = Object.entries(obj)

  const sortedArr = arrFromObj.sort((element1: any, element2: any) => {
    return element1[0].localeCompare(element2[0])
  })
  const sortedObj = Object.fromEntries(sortedArr)
  return sortedObj
}
