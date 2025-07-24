import { insertImport } from "./insert-import";

import { usePackageJson } from '../../composables/usePackageJson';
import { versions } from '../../versions';

export async function insertVuesticCompiler(viteConfigSource: string): Promise<string> {
    const { addDependency } = await usePackageJson();
    await addDependency('@vuestic/compiler', versions['@vuestic/compiler']);

    viteConfigSource = insertImport(viteConfigSource, ['import { vuestic } from "@vuestic/compiler/vite"']);
    const lines = viteConfigSource.split('\n');
    const pluginsLineIndex = lines.findIndex(line => line.includes('plugins:'));
    if (pluginsLineIndex === -1) {
        return viteConfigSource;
    }
    let insertIndex = -1;
    let bracketBalance = 0;

    for (let i = pluginsLineIndex; i < lines.length; i++) {
        const line = lines[i];
        bracketBalance += (line.match(/\[/g)?.length || 0);
        bracketBalance -= (line.match(/\]/g)?.length || 0);

        if (bracketBalance > 0 && line.trim().endsWith('[')) {
            insertIndex = i + 1;
            break;
        }
    }

    const intent = lines[pluginsLineIndex + 1].match(/^\s*/)?.[0] || '';

    if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, `${intent}vuestic(),`);
        return lines.join('\n');
    }

    return viteConfigSource;
}
