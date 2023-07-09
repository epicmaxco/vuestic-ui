import packageUi from 'vuestic-ui/package.json'

/** Force use x.x.x string format */
type Version = `${number}.${number}.${number}`

const uiVersion = packageUi.version as Version

export type NavigationBadge = {
  type: 'new' | 'updated' | 'wip';
  text: string;
  title: string;
}

const parseSemver = (version: Version) => {
  return version.split('.').map(Number) as [number, number, number];
}

const doShowBadge = (uiVersion: Version, docsVersion: Version) => {
  const [uiMajor, uiMinor] = parseSemver(uiVersion);
  const [docsMajor, docsMinor] = parseSemver(docsVersion);
  
  if (uiMajor > docsMajor) {
    return false;
  }

  // If ui version is 1.7.x and docs version is 1.6.x, then hide badge
  if (uiMinor > docsMinor) {
    return false;
  }

  return true;
}

export const navigationBadge = {
  /**
   * @param version format: x.y.z (major.minor.patch)
   * @returns "new" badge until ui minor version is smaller than docs minor version
   */
  new(version: Version): NavigationBadge | undefined {
    if (!doShowBadge(uiVersion, version)) {
      return undefined
    }

    return {
      type: 'new',
      text: 'new',
      title: 'Recently added',
    }
  },

  /**
   * @param version format: x.y.z (major.minor.patch)
   * @returns "updated" badge until ui minor version is smaller than docs minor version
   */
  updated(version: Version): NavigationBadge | undefined {
    if (!doShowBadge(uiVersion, version)) {
      return undefined
    }

    return {
      type: 'updated',
      text: 'updated',
      title: 'Recently updated',
    }
  },

  /**
   * @param version format: x.y.z (major.minor.patch)
   * @returns "wip" badge until ui minor version is smaller than docs minor version
   */
  wip(version: Version): NavigationBadge | undefined {
    if (!doShowBadge(uiVersion, version)) {
      return undefined
    }

    return {
      type: 'wip',
      text: 'wip',
      title: 'Work in progress',
    }
  }
}
