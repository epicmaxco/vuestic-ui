import { dirname } from 'pathe';
import { compileAsync, FileImporter } from 'sass'
import { writeFile, stat, mkdir } from 'fs/promises'
import { existsSync } from 'fs';

const nodeImporter: FileImporter = {
  findFileUrl(url, context) {
    if (url.startsWith('.') || url.startsWith('url') || url.startsWith('http')) {
      return null
    }

    try {
      const resolved = import.meta.resolve(url)
      return new URL(resolved)
    } catch (e) {
      return null
    }
  },
}

const compileScss = async (inputPath: string, outputPath: string) => {
  const result = await compileAsync(inputPath, {
    style: 'compressed',
    importers: [nodeImporter],
  })

  const dirName = dirname(outputPath)

  if (!existsSync(dirName)) {
    await mkdir(dirName, { recursive: true })
  }

  // Write result to output file
  await writeFile(outputPath, result.css, {
    flag: 'w',
  })
}

Promise.all([
  compileScss('./src/styles/index.scss', './dist/ag-theme-vuestic.css'),
  compileScss('./src/styles/theme.scss', './dist/ag-theme-vuestic-clean.css'),
])
