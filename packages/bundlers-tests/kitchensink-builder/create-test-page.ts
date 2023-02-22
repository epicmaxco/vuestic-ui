import { Dirent } from "node:fs";
import {
  readdir,
  mkdir,
  rm,
  access,
  writeFile,
} from "node:fs/promises";
import { resolve } from "path";
import * as process from "process";
import { addComponentToIndexFile, buildIndexFile } from "./build-index-file";
import {processFile} from "./process-file";

const uiElementsPath = resolve(
  __dirname,
  "./../../docs/page-config/ui-elements"
);
const testPageLocation = resolve(__dirname, "./../templates/src");

async function readDir(dir) {
  try {
    return await readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Can't read dir with name - ${dir}`);
    console.error(err);
    process.exit(2);
  }
}

async function getDefaultExampleFromDir(dirName: string) {
  const files = await readDir(resolve(uiElementsPath, dirName));
  let examplesDir: null | Dirent = null;

  for (const file of files) {
    if (file.isDirectory() && file.name === "examples") {
      examplesDir = file;
      break;
    }
  }

  if (!examplesDir) {
    console.log(`Can't find examples directory for ${dirName}`);
    return;
  }

  const examples = await readDir(
    resolve(uiElementsPath, dirName, examplesDir.name)
  );

  for (const example of examples) {
    if (example.isFile() && example.name === "Default.vue") {
      return resolve(uiElementsPath, dirName, examplesDir.name, example.name);
    }
  }

  return null;
}

async function buildTestPage() {
  console.log("Removing previous test page...");
  try {
    await access(resolve(testPageLocation, "custom-components"));

    await rm(resolve(testPageLocation, "custom-components"), {
      recursive: true,
      force: true,
    });
  } catch {}

  try {
    await access(resolve(testPageLocation, "kitchensink.vue"));

    await rm(resolve(testPageLocation, "kitchensink.vue"));
  } catch {}

  console.log("Creating new test page directory...");
  try {
    await mkdir(resolve(testPageLocation, "custom-components"));
  } catch (err) {
    console.error(err);
    process.exit(3);
  }

  console.log("Copying custom-components...");
  const components = await readDir(uiElementsPath);

  for (const component of components) {
    const examplePath = await getDefaultExampleFromDir(component.name);

    if (!examplePath) {
      continue;
    }

    try {
      await processFile(examplePath, component.name)
      addComponentToIndexFile(component.name);
    } catch {
      console.error(`Fail to copy ${examplePath}!!!`);
    }
  }

  console.log("Creating new index file...");
  try {
    await writeFile(`${testPageLocation}/kitchensink.vue`, buildIndexFile());
  } catch {
    console.error("Can't create index file!");
    process.exit(4);
  }
}

buildTestPage();
