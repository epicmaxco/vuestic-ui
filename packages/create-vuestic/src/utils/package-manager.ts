export type PackageManagerName = "npm" | "pnpm" | "yarn";

let manager: PackageManagerName
export const getPackageManagerName: () => PackageManagerName = () => {
  if (manager) {
    return manager
  }
  // This environment variable is set by npm and yarn but pnpm seems less consistent
  const userAgent = process.env.npm_config_user_agent

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      manager = "yarn"
    } else if (userAgent.startsWith("pnpm")) {
      manager = "pnpm"
    } else {
      manager = "npm"
    }
  } else {
    // If no user agent is set, assume npm
    manager = "npm"
  }

  return manager
}
