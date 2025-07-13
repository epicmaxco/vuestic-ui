let count: number = 1

const idMap = new WeakMap<Record<string, unknown>, string>()

export function getObjectId (object: Record<string, unknown>): string {
  const objectId = idMap.get(object)

  if (objectId === undefined) {
    count += 1
    const key = `va-obj-id-${count}`
    idMap.set(object, key)

    return key
  }

  return objectId
}
