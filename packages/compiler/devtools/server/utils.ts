import { Connect } from 'vite';

export const readBody = async (req: Connect.IncomingMessage) => {
  return new Promise<string>((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      resolve(body);
    });
  });
}
