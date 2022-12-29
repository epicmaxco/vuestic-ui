let imports = "";
let template = "";

function addComponentToIndexFile(componentName) {
  // TODO: remove this after VaImage component rework (hydration issues)
  if (componentName === 'image') { return }

  addComponentToTemplate(componentName);
  addComponentToImports(componentName);
}

function convertComponentNameToCamelCase(componentName: string) {
  return componentName.replace(/(^\w|-[a-z])/g, (word) => {
    if (word.length === 1) {
      return word.toUpperCase();
    }

    return word[1].toUpperCase();
  });
}

function convertComponentNameToTemplate(componentName: string) {
  return `<${componentName} />`;
}

function addComponentToTemplate(componentName: string) {
  template += convertComponentNameToTemplate(componentName);
  template += "\n";
}

function addComponentToImports(componentName: string) {
  imports += `import ${convertComponentNameToCamelCase(
    componentName
  )} from './custom-components/${componentName}.vue'\n`;
}

function buildIndexFile() {
  return `<template>
    <div>
      ${template}
    </div>
  </template>

  <script setup>
    ${imports}
  </script>
`;
}

export { addComponentToIndexFile, buildIndexFile };
