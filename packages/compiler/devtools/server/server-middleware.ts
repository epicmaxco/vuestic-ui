import { Connect } from 'vite'
import { readBody } from './utils'
import { API_PREFIX } from '../shared/CONST'
import { getComponentLineAndCol, getComponentSource, setComponentSource } from './file'
import { replacePath, unminifyPath } from '../shared/slug'

export const devtoolsServerMiddleware = (): Connect.NextHandleFunction => {
  return async (req, res, next) => {
    if (!req.url ||!req.url.startsWith(API_PREFIX)) {
      return next() // Ignore non-devtools requests
    }

    const url = new URL(req.url, 'http://localhost:8088');
    const minified = url.searchParams.get('q') ?? ''
    const unminified = unminifyPath(minified as `va:${string}`);

    if (!unminified) {
      res.writeHead(400);
      res.end(`No q provided. Got q="${url.searchParams.get('q')}"`);
      return;
    }

    const [path, start, end] = unminified.split(':');

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/node-source`)) {
      res.writeHead(200)
      res.end(await getComponentSource(path, Number(start), Number(end)));
      return;
    }

    if (req.method === 'PATCH' && req.url.startsWith(`${API_PREFIX}/node-source`)) {
      const body = await readBody(req);

      if (!(typeof body === 'string') || body.length === 0) {
        throw new Error('Body is required.');
      }

      const newPath = await setComponentSource(path, Number(start), Number(end), body);

      replacePath(minified, newPath)

      res.writeHead(200)
      res.end(minified);
      return
    }

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/file-name`)) {
      res.writeHead(200)
      res.end(unminified);
      return;
    }

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/vscode-path`)) {
      const { line, col } = await getComponentLineAndCol(path, Number(start));

      res.writeHead(200)
      res.end(`${unminified.split(':')[0]}:${line}:${col}`);
      return
    }

    next()
  }
}
