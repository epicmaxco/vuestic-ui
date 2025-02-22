import { parse as parseVue } from "@vue/compiler-sfc"
import { parse as parseScript } from "acorn"

function extractFunctionBodies(code: string) {
  let results = [] as { arguments: string, body: string }[];
  let index = 0;

  while ((index = code.indexOf('$onCompile(', index)) !== -1) {
      let start = code.indexOf('(', index) + 1;
      let openParens = 1;
      let funcStart = start;

      while (openParens > 0 && funcStart < code.length) {
          funcStart++;
          if (code[funcStart] === '(') openParens++;
          if (code[funcStart] === ')') openParens--;
      }

      let args = code.slice(start + 1, funcStart).trim();

      funcStart = code.indexOf('=>', funcStart) + 2;
      while (code[funcStart] === ' ') funcStart++;

      if (code[funcStart] !== '{') continue;
      let openBraces = 1;
      let funcEnd = funcStart + 1;

      while (openBraces > 0 && funcEnd < code.length) {
          if (code[funcEnd] === '{') openBraces++;
          if (code[funcEnd] === '}') openBraces--;
          funcEnd++;
      }

      let body = code.slice(funcStart, funcEnd).trim();
      results.push({ arguments: args, body: body });
      index = funcEnd;
  }

  return results;
}

export const parseVueTemplate = (vueFile: string) => {
  const result = parseVue(vueFile)

  const template = result.descriptor.template?.content ?? ''
  const script = result.descriptor.scriptSetup?.content ?? ''

  if (!script) {
    return {
      source: vueFile,
      template,
      props: {
        loading: '',
        icon: '',
        cool: ''
      }
    }
  }

  return {
    source: vueFile,
    template,
    templateAst: result.descriptor.template?.ast,
    script: extractFunctionBodies(script),
    props: {
      loading: '',
      icon: '',
      cool: ''
    }
  }
}
