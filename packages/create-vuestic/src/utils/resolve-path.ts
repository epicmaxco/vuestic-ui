import { resolve } from 'path';
import { existsSync } from 'fs';

export const resolvePath = (...args: string[]) => {
  try {
    const path = resolve(...args)

    if (existsSync(path)) {
      return path;
    }

    return null;
  } catch (e) {
    return null;
  }
}
