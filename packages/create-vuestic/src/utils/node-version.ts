const parseVersion = (version: string) => {
  const versionNumber = version.slice(1).split('.').map((v) => Number(v))

  return versionNumber
}

const isVersionGreater = (versionString: string, requiredVersionString: string) => {
  const nodeVersion = parseVersion(versionString)
  const requiredVersion = parseVersion(requiredVersionString)

  if (nodeVersion[0] > requiredVersion[0]) {
    return true
  } else if (nodeVersion[0] < requiredVersion[0]) {
    return false
  }

  if (nodeVersion[1] > requiredVersion[1]) {
    return true
  } else if (nodeVersion[1] < requiredVersion[1]) {
    return false
  }

  if (nodeVersion[2] > requiredVersion[2]) {
    return true
  } else if (nodeVersion[2] < requiredVersion[2]) {
    return false
  }

  return false
}

export const doesSatisfyNodeVersion: (version: string) => boolean = (version) => {
  return isVersionGreater(process.version, version)
}
