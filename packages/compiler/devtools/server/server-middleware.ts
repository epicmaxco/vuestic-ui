import { Connect } from 'vite'
import { readBody } from './utils'
import { API_PREFIX } from '../shared/CONST'
import { getComponentLineAndCol, getComponentSource, setComponentSource, deleteComponentSource, getRelativeFilePath } from './file'
import { replacePath, unminifyPath } from '../shared/slug'
import { parseFileQuery, stringifyFileQuery } from '../shared/file-query'


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

    const { path, start, end } = parseFileQuery(unminified);

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/node-source`)) {
      res.writeHead(200)
      res.end(await getComponentSource(path, start, end));
      return;
    }

    if (req.method === 'PATCH' && req.url.startsWith(`${API_PREFIX}/node-source`)) {
      const body = await readBody(req);

      if (!(typeof body === 'string')) {
        throw new Error('Body is required.');
      }

      const newPath = await setComponentSource(path, start, end, body);

      replacePath(minified, stringifyFileQuery(newPath.path, newPath.start, newPath.end));

      res.writeHead(200)
      res.end(minified);
      return
    }

    if (req.method === 'DELETE' && req.url.startsWith(`${API_PREFIX}/node-source`)) {
      const newPath = await deleteComponentSource(path, start, end);

      replacePath(minified, stringifyFileQuery(newPath.path, newPath.start, newPath.end));

      res.writeHead(200)
      res.end();
      return
    }

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/file-name`)) {
      res.writeHead(200)
      res.end(unminified);
      return;
    }

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/relative-file-path`)) {
      res.writeHead(200)
      res.end(getRelativeFilePath(path));
      return
    }

    if (req.method === 'GET' && req.url.startsWith(`${API_PREFIX}/vscode-path`)) {
      const { line, col } = await getComponentLineAndCol(path, Number(start));

      res.writeHead(200)
      // File Editor path for vite internal openInEditor method
      res.end(`${path}:${line}:${col}`);
      return
    }

    next()
  }
}
