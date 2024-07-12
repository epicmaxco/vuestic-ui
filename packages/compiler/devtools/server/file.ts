import { readFile, writeFile } from 'node:fs/promises';

export const requestSource = async (path: string) => {
  const source = await readFile(path, 'utf-8');
  return source.toString();
};

export const getIntent = (source: string, lineStart: number) => {
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

export const removeIntent = (source: string, intent: number): string => {
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

export const addIntent = (source: string, intent: number): string => {
  const lines = source.split('\n');
  const intentString = ' '.repeat(intent);
  return lines
    .filter((line) => line.length > 0)
    .map((line, index) => {
      if (index === 0) {
        return line;
      }
      return intentString + line;
    })
    .join('\n');
};

export const getComponentSource = async (path: string, start: number, end: number) => {
  const fileSource = await requestSource(path);
  const intent = getIntent(fileSource, start);
  const componentSource = fileSource.slice(start, end);
  return removeIntent(componentSource, intent);
}

export const setComponentSource = async (path: string, start: number, end: number, source: string) => {
  const fileSource = await requestSource(path);
  const intent = getIntent(fileSource, start);
  const sourceWithIntent = addIntent(source, intent);
  const fileSourceStart = fileSource.slice(0, start);
  const fileSourceEnd = fileSource.slice(end);

  const newFileContent = fileSourceStart + sourceWithIntent + fileSourceEnd;

  await writeFile(path, newFileContent);

  const newPath = `${path}:${start}:${start + sourceWithIntent.length}`;

  return newPath
}

export const getComponentLineAndCol = async (path: string, start: number) => {
  const fileSource = await requestSource(path);
  const intent = getIntent(fileSource, start);
  const lines = fileSource.slice(0, start).split('\n');
  const line = lines.length;
  const col = intent;
  return { line, col };
}
