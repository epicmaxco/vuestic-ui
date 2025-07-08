import { insertImport } from "./insert-import";

export function insertVuesticCompiler(viteConfigSource: string): string {
    
    viteConfigSource = insertImport(viteConfigSource, ['import vuestic from "vite-plugin-vuestic"']);
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

    if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, '        vuestic(),');
        return lines.join('\n');
    }

    return viteConfigSource; 
}