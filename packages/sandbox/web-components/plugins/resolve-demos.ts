import { Plugin, UserConfig, ViteDevServer } from 'vite';
import { readdir, watch, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'

const watchForDirChange = (dir: string, cb: (file: string, event: 'change' | 'rename') => void) => {
  const ac = new AbortController();
  const { signal } = ac;
  const w = async () => {
    try {
      const watcher = watch(dir, { signal })
      for await (const event of watcher)
        cb(event.filename, event.eventType);
      w()
    } catch(err) {
      if (err.name == 'AbortError') { return }
      throw err
    }
  }
  w()
  return ac
}

export default () => {
  let config: UserConfig
  let imports: string
  let stopWatch: AbortController

  const createDemoImports = async () => {
    const demosPath = (`${config.root || './'}/src/demos`)
    const files = await readdir(demosPath)

    const fileImports = await Promise.all((files)
      .map(async (path, index) => {
        return `import demo_${index} from '${resolve(`${demosPath}/${path}`)}?raw';`
      }))

    const fileExports = 'export default [\n' + files.map((path, index) => {
      return `demo_${index}`
    }).join(',\n') + '\n]'

    return fileImports.join('\n') + '\n' + fileExports
  }

  return {
    name: 'va:demos-resolver',
    enforce: 'pre',

    config(c) {
      config = c
      imports = (`${config.root || '.'}/node_modules/.cache/demos.js`)
    },

    configureServer: (server: ViteDevServer) : void => {
        server.watcher.options = {
            ...server.watcher.options,
            ignored: [
                /node_modules\/(?!.cache\/demos.js).*/,
                '**/.git/**',
            ]
        }
    },

    async buildStart() {
      const demosPath = (`${config.root || './'}/src/demos`)
      stopWatch = watchForDirChange(demosPath, async (file, ev) => {
        writeFile(imports, await createDemoImports())
      })

      if (!existsSync(dirname(imports))) {
        await mkdir(dirname(imports), { recursive: true })
      }

      writeFile(imports, await createDemoImports(), { flag: 'w' })

      this.addWatchFile(imports)
    },

    async buildEnd() {
      stopWatch.abort()
    },

    async transform(source: string, id: string) {
      if (!/from '#demos'/.test(source)) { return }

      return source.replace(`from '#demos'`, `from '${(await this.resolve(resolve(imports), id))!.id}'`)
    }
  } as Plugin
}
