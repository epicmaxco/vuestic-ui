import { readFile } from 'node:fs/promises';

export const requestSource = async (path) => {
  const source = await readFile(path, 'utf-8');
  return source.toString();
};

export const getIntent = (source, lineStart) => {
  let intent = 0;
  for (let i = lineStart - 1; i > 0; i--) {
    if (source[i] === ' ') {
      intent++;
    } else {
      break;
    }
  }
  return intent;
};

export const removeIntent = (source, intent) => {
  const lines = source.split('\n');
  const intentString = ' '.repeat(intent);
  return lines
    .map((line) => {
      if (line.startsWith(intentString)) {
        return line.slice(intentString.length);
      }
      return line;
    })
    .join('\n');
};

export const addIntent = (source, intent) => {
  const lines = source.split('\n');
  const intentString = ' '.repeat(intent);
  return lines
    .map((line, index) => {
      if (index === 0) {
        return line;
      }
      return intentString + line;
    })
    .join('\n');
};
