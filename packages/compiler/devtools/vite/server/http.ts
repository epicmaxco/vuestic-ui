import { writeFile } from 'fs/promises';
import { createServer } from 'node:http';
import { unminifyPath } from '../../shared/slug';
import { addIntent, getIntent, removeIntent, requestSource } from './file';

const CORS_FRIENDLY_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, UPDATE, PATCH',
  'Content-Type': 'text/plain'
}

export const createDevtoolsServer = () => createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, CORS_FRIENDLY_HEADERS);
    res.end('ok');
    return;
  }

  if (!req.url) {
    throw new Error('Unexpected error: empty url')
  }

  const url = new URL(req.url, 'http://localhost:8088');
  const q = unminifyPath(url.searchParams.get('q') ?? '');

  if (!q) {
    res.writeHead(400, CORS_FRIENDLY_HEADERS);
    res.end(`No q provided. Got q="${url.searchParams.get('q')}"`);
    return;
  }

  const [path, start, end] = q.split(':');

  if (req.method === 'GET' && req.url.startsWith('/node-source')) {
    const currentSource = await requestSource(path);
    const intent = getIntent(currentSource, Number(start));
    const source = removeIntent(currentSource.slice(Number(start), Number(end)), intent);

    res.writeHead(200, CORS_FRIENDLY_HEADERS);
    res.end(await source);
  } else if (req.method === 'PATCH' && req.url.startsWith('/node-source')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      if (!(typeof body === 'string')) { throw new Error('Body is required.'); }

      const bodyWithIntent = addIntent(body, getIntent(await requestSource(path), Number(start)));
      await writeFile(path, (await requestSource(path)).slice(0, Number(start)) + bodyWithIntent + (await requestSource(path)).slice(Number(end)));

      res.writeHead(200, CORS_FRIENDLY_HEADERS);
      res.end(`${path}:${start}:${Number(start) + bodyWithIntent.length}`)
    });
  } else if (req.method === 'POST' && req.url.startsWith('/add-event-listener')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      if (!body) { throw new Error('Body is required.'); }

      const bodyWithIntent = addIntent(body, getIntent(await requestSource(path), Number(start)));
      await writeFile(path, (await requestSource(path)).slice(0, Number(start)) + bodyWithIntent + (await requestSource(path)).slice(Number(end)));

      res.writeHead(200, CORS_FRIENDLY_HEADERS);
      res.end(`${path}:${start}:${Number(end)}`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
