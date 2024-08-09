import { API_PREFIX } from '../../../../shared/CONST';

const API_URL = new URL(import.meta.url).origin + API_PREFIX

export const getNodeSource = (q: string) => {
  return fetch(`${API_URL}/node-source?q=${q}`)
}

export const setNodeSource = (q: string, source: string) => {
  return fetch(`${API_URL}/node-source?q=${q}`, {
    method: 'PATCH',
    body: source,
  })
}

export const getFileName = (q: string) => {
  return fetch(`${API_URL}/file-name?q=${q}`)
}

export const getVSCodePath = (q: string) => {
  return fetch(`${API_URL}/vscode-path?q=${q}`)
}

export const deleteNodeSource = (q: string) => {
  return fetch(`${API_URL}/node-source?q=${q}`, {
    method: 'DELETE',
  })
}

export const getFileRelativePath = (q: string) => {
  return fetch(`${API_URL}/relative-file-path?q=${q}`)
}
