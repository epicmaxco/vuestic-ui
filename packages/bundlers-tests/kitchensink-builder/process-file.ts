import { resolve } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { createInterface } from "readline";

type FileMeta = {
  filePath: string,
  name: string
}

export async function processFile(filePath: string, componentName: string) {

  //TODO: no docs default examples styles block processor, but not sure if we need it because of Tailwind CSS
  const sections = {
    template: false,
    script: false,
    style: false,
  };
  const externalFilesToCopy: FileMeta[] = [];

  function testSectionEdge(line: string) {
    if (line === "<template>") {
      sections.template = true;
      return;
    }
    if (sections.template && line === "</template>") {
      sections.template = false;
      return;
    }
    if (/<script((?: lang="(?:ts|js)")?|(?: setup)?)+>/i.test(line)) {
      sections.script = true;
      return;
    }
    if (sections.script && line === "</script>") {
      sections.script = false;
      return;
    }
  }

  function processLine(line: string): string {
    let result = line;
    if (sections.template) {
      // replace execute $t in template to simple string
      result = line.replace(/\$t\(.+\)/g, (part) => part.slice(3, -1));
    }

    if (sections.script) {
      const fileNameMatch = line.match(/import [A-Za-z-_]+ from ['"](?<fileName>.+)['"]/);
      const fileDirMatch = filePath.match(/(?<fileDir>.+)\/\w+\.vue$/);

      if (fileDirMatch?.groups?.fileDir && fileNameMatch?.groups?.fileName) {
        externalFilesToCopy.push({
          filePath: resolve(fileDirMatch.groups.fileDir, fileNameMatch.groups.fileName),
          name: fileNameMatch.groups.fileName.slice(2, -4) // get only component name without any "./" and extensions
      });
      }
    }

    return result + "\n";
  }

  const fileHandler = createReadStream(filePath);
  const outputFileHandler = createWriteStream(
    resolve(__dirname, `./../templates/src/custom-components/${componentName}.vue`)
  );
  const lines = createInterface({
    input: fileHandler,
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    testSectionEdge(line);
    outputFileHandler.write(processLine(line));
  }

  if (externalFilesToCopy.length) {
    for (const fileData of externalFilesToCopy) {
      await processFile(fileData.filePath, fileData.name)
    }
  }
}
