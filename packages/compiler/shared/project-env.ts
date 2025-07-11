import { parseJSON5 } from 'confbox';
import { existsSync, readFileSync } from 'fs';

function readPackageJson<T>() {
  try {
    const packageJson = readFileSync('package.json', 'utf-8');
    return parseJSON5(packageJson) as T;
  } catch (error) {
    return null;
  }
}

function checkModuleExists(moduleName: string): boolean {
  try {
    import.meta.resolve?.(moduleName)
    return true;
  } catch (error) {
    return false;
  }
}

function getNodeVersion() {
  const version = process.versions.node;
  return {
    major: parseInt(version.split('.')[0], 10),
    minor: parseInt(version.split('.')[1], 10),
    patch: parseInt(version.split('.')[2], 10),
    full: version,
    toString: () => version,
  }
}

function getPackageManager() {
  const packageJson = readPackageJson<{ packageManager?: string }>();

  if (existsSync('yarn.lock')) {
    return 'yarn';
  }

  if (existsSync('pnpm-lock.yaml')) {
    return 'pnpm';
  }

  if (existsSync('bun.lockb')) {
    return 'bun';
  }

  if (existsSync('package-lock.json')) {
    return 'npm';
  }

  return packageJson?.packageManager?.split('@')[0] || 'npm';
}

export const getProjectEnv = () => {
  return {
    hasVuesticUI: checkModuleExists('vuestic-ui'),
    hasTailwindCSS: checkModuleExists('tailwindcss'),
    nodeVersion: getNodeVersion(),
    packageManager: getPackageManager(),
  }
}
