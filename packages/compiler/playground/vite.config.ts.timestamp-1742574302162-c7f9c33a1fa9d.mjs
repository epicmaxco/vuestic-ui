// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import Inspect from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/vite-plugin-inspect/dist/index.mjs";
import { defineConfig } from "file:///Users/m0ksem/Code/vuestic-ui/packages/compiler/playground/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/m0ksem/Code/vuestic-ui/packages/compiler/playground/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// ../vite-plugin/index.ts
import { createLogger } from "file:///Users/m0ksem/Code/vuestic-ui/packages/compiler/node_modules/vite/dist/node/index.js";

// ../shared/merge-deep.ts
var isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
var mergeDeep = (target, source) => {
  if (!isObject(target)) {
    target = {};
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (sourceValue instanceof RegExp || sourceValue instanceof Date) {
      target[key] = sourceValue;
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.create(
        Object.getPrototypeOf(targetValue),
        Object.getOwnPropertyDescriptors(targetValue)
      ), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};

// ../virtual-components/lib/ast-transform/transform-vue-file.ts
import { MagicString as MagicString2, parse as parseVue } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";

// ../virtual-components/lib/ast-transform/walk.ts
import { NodeTypes, ElementTypes } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
var walk = (node, cb) => {
  if (!("children" in node)) {
    return;
  }
  const children = [...node.children];
  for (const child of children) {
    if (typeof child === "string") {
      continue;
    }
    if (typeof child === "symbol") {
      continue;
    }
    if (child.type === NodeTypes.SIMPLE_EXPRESSION) {
      continue;
    }
    cb(child, node);
    if (node.children.includes(child)) {
      walk(child, cb);
    }
  }
};
var walkTags = (node, cb) => {
  walk(node, (node2) => {
    if (node2.type === NodeTypes.ELEMENT && node2.tagType === ElementTypes.COMPONENT) {
      cb(node2);
    }
  });
};

// ../virtual-components/lib/create-compiler-context.ts
import { NodeTypes as NodeTypes3 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";

// ../virtual-components/lib/utils.ts
import { ElementTypes as ElementTypes2, NodeTypes as NodeTypes2 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
var isPropAttribute = (prop) => {
  return prop.type === NodeTypes2.ATTRIBUTE;
};
var isPropDirective = (prop) => {
  return prop.type === NodeTypes2.DIRECTIVE;
};
var isNodeTemplateSlot = (node) => {
  return node.type === NodeTypes2.ELEMENT && node.tagType === ElementTypes2.TEMPLATE;
};
var toCamelCase = (str) => {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

// ../virtual-components/lib/execute/execute.ts
import { MagicString } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";
import { parse } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/acorn/dist/acorn.mjs";
var execute = (code) => {
  try {
    return (0, eval)(code);
  } catch (e) {
    return null;
  }
};
var stringifyValue = (value) => {
  const str = JSON.stringify(value);
  if (str.startsWith('"') && str.endsWith('"')) {
    return `'${str.slice(1, -1)}'`;
  }
  return;
};
var onAccess = (node, codeString, cb) => {
  if (node.type === "PropertyAccessExpression") {
    return cb(node);
  }
  if (node.type === "Identifier") {
    return cb(node);
  }
  if (node.type === "CallExpression") {
    node.arguments.forEach((arg) => {
      onAccess(arg, codeString, cb);
    });
    return onAccess(node.callee, codeString, cb);
  }
  if ("children" in node) {
    for (const child of node.children) {
      onAccess(child, codeString, cb);
    }
  }
  if ("expressions" in node) {
    for (const expression of node.expressions) {
      onAccess(expression, codeString, cb);
    }
  }
  if ("expression" in node) {
    onAccess(node.expression, codeString, cb);
  }
  if ("left" in node) {
    onAccess(node.left, codeString, cb);
  }
  if ("right" in node) {
    onAccess(node.right, codeString, cb);
  }
  if ("object" in node) {
    onAccess(node.object, codeString, cb);
  }
  if ("elements" in node) {
    for (const element of node.elements) {
      onAccess(element, codeString, cb);
    }
  }
};
var add_ctx = (node, codeString, ignore) => {
  onAccess(node, codeString, (node2) => {
    if (node2.type === "Identifier" && ignore.includes(node2.name)) {
      return;
    }
    if (node2.type === "PropertyAccessExpression" && node2.object.type === "Identifier" && ignore.includes(node2.object.name)) {
      return;
    }
    codeString.appendLeft(node2.start, "_ctx.");
  });
};
var addContext = (code, ignore = []) => {
  const codeString = new MagicString(code);
  const ast = parse(code, { ecmaVersion: 2020 });
  add_ctx(ast.body[0], codeString, ignore);
  return codeString.toString();
};
var simplifyCode = (code, ctx) => {
  const codeString = new MagicString(code);
  const ast = parse(code, { ecmaVersion: 2020 });
  onAccess(ast.body[0], codeString, (node) => {
    if (ctx.component.script.scriptSetupContent.functionNames.includes(node.name)) {
      ctx.imports.push(node.name);
    }
    if (!("name" in node) || typeof node.name !== "string") {
      console.warn("Unable to parse expression", code, "Invalid node", node);
      return;
    }
    if (node.name === "$props") {
      codeString.overwrite(node.start, node.end + 1, "");
      return;
    }
    const dynamicProp = ctx.dynamicProps.find((p) => p.name === node.name);
    if (dynamicProp) {
      codeString.overwrite(node.start, node.end, dynamicProp.value);
      return;
    }
    const staticProp = ctx.props.find((p) => p.name === node.name);
    if (staticProp) {
      if (codeString.original[node.start - 2] === "$" && codeString.original[node.start - 1] === "{" && codeString.original[node.end] === "}") {
        codeString.overwrite(node.start - 2, node.end + 1, staticProp.value);
        return;
      }
      const value = stringifyValue(staticProp.value);
      if (!value) {
        console.warn("Unable to find prop value", staticProp, value);
        return;
      }
      codeString.overwrite(node.start, node.end, value);
      return;
    }
  });
  return codeString.toString();
};

// ../virtual-components/lib/execute/print-rendering-context.ts
var createInTemplateExecuter = (ctx) => {
  let isDynamic = false;
  const _ctxObj = new Proxy({}, {
    get(target, key) {
      const dynamicProp = ctx.dynamicProps.find((prop) => prop.name === key);
      if (dynamicProp) {
        isDynamic = true;
        return `${dynamicProp.value}`;
      }
      const staticProp = ctx.props.find((prop) => prop.name === key);
      if (staticProp) {
        return staticProp.value;
      }
      if (key in ctx.slots) {
        return "$slots." + key;
      }
      if (key === "$props") {
        return _ctxObj;
      }
      if (key === "$slots") {
        return ctx.slots;
      }
    }
  });
  let scopeStack = [];
  const codeRunner = (code) => {
    const scope = scopeStack.reduce((acc, scope2) => {
      return {
        static: { ...acc.static, ...scope2.static },
        dynamic: { ...acc.dynamic, ...scope2.dynamic }
      };
    }, {});
    const fnCode = `((_ctx) => {
      ${ctx.component.script.scriptSetupContent.functions.join("\n")}
      return (() => ${addContext(code, ctx.component.script.scriptSetupContent.functionNames)})()
    })
    `;
    const newCtx = new Proxy(_ctxObj, {
      get(target, key) {
        if (scope.dynamic && key in scope.dynamic) {
          isDynamic = true;
          return scope.dynamic[key];
        }
        if (scope.static && key in scope.static) {
          return scope.static[key];
        }
        return _ctxObj[key];
      }
    });
    isDynamic = false;
    const fn = execute(fnCode);
    let value;
    try {
      value = fn(newCtx);
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
    }
    if (isDynamic) {
      return {
        value: simplifyCode(code, ctx),
        isDynamic: true
      };
    }
    return {
      value,
      isDynamic: false
    };
  };
  codeRunner.addScope = (scope) => {
    scopeStack.push(scope);
  };
  codeRunner.removeScope = (scope) => {
    scopeStack = scopeStack.filter((s) => s !== scope);
  };
  codeRunner.tryGetValue = (code) => {
    try {
      return execute(`(() => ${code})()`);
    } catch (e) {
      return null;
    }
  };
  return codeRunner;
};
var printValueInTemplate = (result, type) => {
  if (result.isDynamic) {
    if (type === "Bind") {
      return String(result.value);
    } else if (type === "Interpolation") {
      return `{{ ${result.value} }}`;
    } else {
      throw new Error(`Can not print value in template. Invalid type ${type}`);
    }
  }
  return String(result.value);
};

// ../virtual-components/lib/create-compiler-context.ts
var findSlotName = (child) => {
  for (const prop of child.props) {
    if (prop.type === NodeTypes3.DIRECTIVE) {
      if (prop.arg?.type === NodeTypes3.SIMPLE_EXPRESSION) {
        return prop.arg.content;
      }
    }
  }
  return null;
};
var createCompilerContextSlots = (node) => {
  const directives = node.props.filter((prop) => prop.type === NodeTypes3.DIRECTIVE);
  const templateSlots = node.children.filter(isNodeTemplateSlot);
  const defaultSlotNodes = node.children.filter((child) => !isNodeTemplateSlot(child));
  const slots = {};
  templateSlots.forEach((child) => {
    const slotName = findSlotName(child);
    if (!slotName) {
      return;
    }
    slots[slotName] = {
      name: slotName,
      children: child.children
    };
  });
  if (defaultSlotNodes.length) {
    const slotDirective = directives.find((dir) => dir.name === "slot");
    if (slotDirective && slotDirective.arg) {
      const slotName = "content" in slotDirective.arg ? slotDirective.arg.content : "default";
      directives.splice(directives.indexOf(slotDirective), 1);
      slots[slotName] = {
        name: slotName,
        children: defaultSlotNodes
      };
    } else {
      slots.default = {
        name: "default",
        children: defaultSlotNodes
      };
    }
  }
  return slots;
};
var createProps = (node, component) => {
  const staticProps = [];
  const dynamicProps = [];
  const staticAttrs = [];
  const dynamicAttrs = [];
  const definedProps = component.script.props;
  const defaultProps = component.script.propsDefaults;
  const directives = [];
  node.props.forEach((prop) => {
    if (isPropAttribute(prop)) {
      if (definedProps.includes(prop.name)) {
        staticProps.push({
          name: toCamelCase(prop.name),
          rawName: prop.name,
          value: prop.value?.content ?? defaultProps[prop.name]
        });
      } else {
        staticAttrs.push({
          name: toCamelCase(prop.name),
          value: prop.value?.content ?? "true"
        });
      }
    }
    if (isPropDirective(prop)) {
      if (prop.name === "bind" && prop.arg?.type === NodeTypes3.SIMPLE_EXPRESSION && prop.exp?.type === NodeTypes3.SIMPLE_EXPRESSION) {
        const name = toCamelCase(prop.arg.content);
        if (definedProps.includes(name)) {
          dynamicProps.push({
            name,
            rawName: prop.arg.content,
            value: prop.exp.content
          });
        } else {
          dynamicAttrs.push({
            name,
            value: prop.exp.content
          });
        }
      } else if (["if", "for"].includes(prop.name)) {
        directives.push(prop);
      } else if (prop.name === "slot") {
      } else {
        console.error("Unsupported directive");
        throw new Error("Unsupported directive " + prop.name + " in " + node.loc.source);
      }
    }
  });
  definedProps.forEach((propName) => {
    const exists = staticProps.find((prop) => prop.name === propName);
    if (!exists) {
      staticProps.push({
        name: toCamelCase(propName),
        rawName: propName,
        value: defaultProps[propName] ?? void 0
      });
    }
  });
  return {
    directives,
    staticProps,
    dynamicProps,
    staticAttrs,
    dynamicAttrs
  };
};
var createCompilerContext = (node, component) => {
  const { tag } = node;
  const {
    staticProps,
    dynamicProps,
    staticAttrs,
    dynamicAttrs,
    directives
  } = createProps(node, component);
  const slots = createCompilerContextSlots(node);
  const imports = [];
  return {
    name: tag.replace(/^Vc/g, ""),
    tag,
    component,
    props: staticProps,
    attrs: staticAttrs,
    dynamicProps,
    dynamicAttrs,
    directives,
    slots,
    imports,
    execute: createInTemplateExecuter({
      props: staticProps,
      dynamicProps,
      slots,
      imports,
      component
    })
  };
};

// ../virtual-components/lib/ast-transform/ast-helpers.ts
import { ElementTypes as ElementTypes3, NodeTypes as NodeTypes4 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
var isPropAttribute2 = (prop) => {
  return prop.type === NodeTypes4.ATTRIBUTE;
};
var isPropDirective2 = (prop) => {
  return prop.type === NodeTypes4.DIRECTIVE;
};
var isNodeSlot = (node) => {
  return node.type === NodeTypes4.ELEMENT && node.tagType === ElementTypes3.SLOT;
};
var isNodeElement = (node) => {
  return node.type === NodeTypes4.ELEMENT;
};
var isNodeHasChildren = (node) => {
  return "children" in node;
};
var isNodeInterpolation = (node) => {
  return node.type === NodeTypes4.INTERPOLATION;
};
var patchNode = (node, newNode) => {
  const keys = Object.keys(node);
  for (const key of keys) {
    delete node[key];
  }
  Object.assign(node, newNode);
  return node;
};

// ../virtual-components/lib/ast-transform/transformers/transform-slot-node.ts
function getNodeSlotName(node) {
  const nameProp = node.props.find((prop) => prop.name === "name");
  if (nameProp && isPropAttribute2(nameProp)) {
    return nameProp.value?.content;
  }
  return void 0;
}
var transformSlotNode = (node, parent, ctx) => {
  const nodeIndex = parent.children.indexOf(node);
  const slotName = getNodeSlotName(node) || "default";
  const slot = ctx.slots[slotName];
  if (!slot) {
    parent.children.splice(nodeIndex, 1);
    return;
  }
  parent.children.splice(nodeIndex, 1, ...slot.children);
};

// ../virtual-components/lib/ast-transform/transformers/transform-prop-bind.ts
import { NodeTypes as NodeTypes5 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
import { normalizeClass, normalizeStyle } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/shared/index.js";
var transformBindDirective = (prop, ctx) => {
  if (prop.exp?.type !== NodeTypes5.SIMPLE_EXPRESSION) {
    console.warn("Only simple expressions are supported in prop binds");
    return;
  }
  if (!prop.arg || prop.arg.type !== NodeTypes5.SIMPLE_EXPRESSION) {
    throw new Error("Invalid bind directive: v-bind directive is not supported yet. Use :prop instead");
  }
  const result = ctx.execute(prop.exp.content);
  if (prop.arg.content === "class") {
    result.value = normalizeClass(result.value);
  } else if (prop.arg.content === "style") {
    result.value = normalizeStyle(result.value);
  }
  if (result.isDynamic) {
    prop.exp.content = printValueInTemplate(result, "Bind");
  } else {
    patchNode(prop, {
      type: NodeTypes5.ATTRIBUTE,
      loc: prop.loc,
      name: prop.arg.content,
      nameLoc: prop.arg.loc,
      value: {
        type: NodeTypes5.TEXT,
        content: result.value,
        loc: prop.exp.loc
      }
    });
  }
};
var transformIfDirective = (prop, node, parent, ctx) => {
  if (prop.exp?.type !== NodeTypes5.SIMPLE_EXPRESSION) {
    console.warn("Only simple expressions are supported in v-if");
    return;
  }
  const result = ctx.execute(prop.exp.content);
  if (result.value) {
    if (!result.isDynamic) {
      node.props = node.props.filter((p) => prop !== p);
    } else {
      prop.exp.content = printValueInTemplate(result, "Bind");
    }
    return;
  }
  parent.children = parent.children.filter((child) => child !== node);
};
var transformForDirective = (prop, node, parent, ctx) => {
  const arrayStr = prop.forParseResult?.source.loc.source;
  const argsStr = prop.forParseResult?.value?.loc.source;
  if (!arrayStr || !argsStr) {
    throw new Error("Invalid v-for directive: Unable to parse v-for");
  }
  const providedProp = ctx.dynamicProps.find((prop2) => prop2.name === arrayStr);
  if (!providedProp) {
    throw new Error("Invalid v-for directive: No prop passed, idk what to do");
  }
  const executionResult = ctx.execute(providedProp.value);
  let array = executionResult.value;
  if (executionResult.isDynamic) {
    array = ctx.execute.tryGetValue(executionResult.value);
  }
  if (array && Array.isArray(array)) {
    node.props = node.props.filter((p) => p !== prop);
    node.props = node.props.filter((p) => isPropDirective2(p) && p.name === "bind" && "content" in p.arg && p.arg?.content !== "key");
    const children = array.map((item) => {
      const clonedNode = structuredClone(node);
      const scope = { static: { item } };
      ctx.execute.addScope(scope);
      const newNode = transformAstWithContext(clonedNode, ctx);
      ctx.execute.removeScope(scope);
      return newNode;
    });
    parent.children = parent.children.map((child) => {
      if (child === node) {
        return children;
      }
      return child;
    }).flat();
    return;
  } else {
    const key = node.props.find((p) => isPropDirective2(p) && p.name === "bind" && "content" in p.arg && p.arg?.content === "key");
    node.props = node.props.filter((p) => p !== key);
    const scope = { dynamic: { item: "item" } };
    parent.children = parent.children.map((child) => {
      if (!isNodeElement(child)) {
        return child;
      }
      ctx.execute.addScope(scope);
      const newNode = transformAstWithContext(child, ctx);
      ctx.execute.removeScope(scope);
      return newNode;
    });
    if (key) node.props.push({ ...key });
  }
};
var transformPropBind = (prop, node, parent, ctx) => {
  if (!prop) {
    return;
  }
  if (prop.name === "bind") {
    return transformBindDirective(prop, ctx);
  } else if (prop.name === "if") {
    return transformIfDirective(prop, node, parent, ctx);
  } else if (prop.name === "for") {
    return transformForDirective(prop, node, parent, ctx);
  } else if (prop.name === "slot") {
    return;
  }
  console.warn("Unknown directive", prop.name);
  throw new Error("Invalid bind directive");
};
var mergeDuplicate = (props) => {
  const newProps = [];
  props.forEach((prop) => {
    if (!newProps.find((p) => p.name === prop.name)) {
      newProps.push(prop);
    } else {
      if (isPropAttribute2(prop) && (prop.name === "class" || prop.name === "style")) {
        const existingProp = newProps.find((p) => p.name === prop.name);
        const existingValue = existingProp.value?.content;
        const newValue = prop.value?.content;
        if (prop.name === "class") {
          existingProp.value.content = normalizeClass(`${existingValue} ${newValue}`);
        } else {
          existingProp.value.content = String(normalizeStyle(`${existingValue}; ${newValue}`));
        }
      }
    }
  });
  return newProps;
};

// ../virtual-components/lib/ast-transform/transformers/transform-interpolation.ts
import { NodeTypes as NodeTypes6 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
var transformInterpolation = (node, ctx) => {
  if (node.content.type !== NodeTypes6.SIMPLE_EXPRESSION) {
    throw new Error("Only simple expressions are supported in text interpolations");
  }
  const result = ctx.execute(node.content.content);
  patchNode(node, {
    type: NodeTypes6.TEXT,
    content: printValueInTemplate(result, "Interpolation"),
    loc: node.loc
  });
};

// ../virtual-components/lib/ast-transform/transformers/transform-root-node-attrs.ts
import { ConstantTypes, NodeTypes as NodeTypes7 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
var transformRootNodeAttrs = (rootNode, ctx) => {
  ctx.directives.forEach((directive) => {
    rootNode.props.push(directive);
  });
  ctx.attrs.forEach(({ name, value }) => {
    if (name === "class" || name === "style") {
      const prop = rootNode.props.find((prop2) => prop2.name === name);
      if (!prop || !("value" in prop)) {
        return;
      }
      if (!prop.value) {
        throw new Error("Expected prop value");
      }
      prop.value.content = `${prop.value.content} ${value}`;
      return;
    }
    if (rootNode.props.find((prop) => prop.name === name && isPropAttribute2(prop))) {
      return;
    }
    rootNode.props.push({
      type: NodeTypes7.ATTRIBUTE,
      name,
      nameLoc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ""
      },
      loc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ""
      },
      value: {
        type: NodeTypes7.TEXT,
        content: String(value),
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ""
        }
      }
    });
  });
  ctx.dynamicAttrs.forEach(({ name, value }) => {
    if (rootNode.props.find((prop) => prop.name === name && !isPropAttribute2(prop))) {
      return;
    }
    rootNode.props.push({
      type: NodeTypes7.DIRECTIVE,
      name: "bind",
      loc: {
        start: { offset: -1, column: -1, line: -1 },
        end: { offset: -1, column: -1, line: -1 },
        source: ""
      },
      exp: {
        type: NodeTypes7.SIMPLE_EXPRESSION,
        content: value,
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ""
        },
        isStatic: false,
        constType: ConstantTypes.NOT_CONSTANT
      },
      arg: {
        type: NodeTypes7.SIMPLE_EXPRESSION,
        content: name,
        loc: {
          start: { offset: -1, column: -1, line: -1 },
          end: { offset: -1, column: -1, line: -1 },
          source: ""
        },
        isStatic: true,
        constType: ConstantTypes.CAN_STRINGIFY
      },
      modifiers: []
    });
  });
};

// ../virtual-components/lib/ast-transform/transform-node.ts
var transformAstWithContext = (node, ctx) => {
  if ("__virtualComponentTransformed" in node && node.__virtualComponentTransformed) {
    return node;
  }
  walk(node, (node2, parent) => {
    if (isNodeSlot(node2)) {
      if (!isNodeElement(parent)) {
        return;
      }
      return transformSlotNode(node2, parent, ctx);
    }
    if (isNodeElement(node2) && isNodeHasChildren(parent)) {
      node2.props.forEach((prop) => {
        if (isPropDirective2(prop) && node2.props.includes(prop)) {
          transformPropBind(prop, node2, parent, ctx);
        }
      });
      node2.props = mergeDuplicate(node2.props);
    }
    if (isNodeInterpolation(node2)) {
      return transformInterpolation(node2, ctx);
    }
  });
  if (ctx.attrs.length > 0 || ctx.dynamicAttrs.length > 0 || ctx.directives.length > 0) {
    if (node.children.length === 1) {
      const rootNode = node.children[0];
      if (isNodeElement(rootNode)) {
        transformRootNodeAttrs(rootNode, ctx);
      } else {
        console.warn("Unable to pass attributes. Expected virtual component root node to be Element");
      }
    } else {
      console.warn("Unable to pass attributes. Expected virtual component to have only one root node");
    }
  }
  node.__virtualComponentTransformed = true;
  return node;
};
var transformAstNode = (node, component) => {
  const ctx = createCompilerContext(node, component);
  const newAst = structuredClone(component.templateAst);
  transformAstWithContext(newAst, ctx);
  return {
    ast: newAst,
    imports: ctx.imports
  };
};

// ../virtual-components/lib/ast-transform/render/render-template-ast.ts
import { NodeTypes as NodeTypes8 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-core/index.js";
function tab(size) {
  return " ".repeat(size);
}
function renderTag(node) {
  if (node.props.length === 0) {
    return `${node.tag}`;
  }
  const props = node.props.map((prop) => {
    if (prop.type === NodeTypes8.DIRECTIVE) {
      if (prop.name === "bind" && prop.exp?.type === NodeTypes8.SIMPLE_EXPRESSION && prop.arg?.type === NodeTypes8.SIMPLE_EXPRESSION) {
        return `:${prop.arg?.content}="${prop.exp.content}"`;
      }
      if (prop.name === "if" && prop.exp?.type === NodeTypes8.SIMPLE_EXPRESSION) {
        return `${prop.rawName}="${prop.exp.content}"`;
      }
      return prop.loc.source;
    }
    if (!prop.value) {
      return `${prop.name}`;
    }
    return `${prop.name}="${prop.value.content}"`;
  });
  return `${node.tag} ${props.join(" ")}`;
}
function renderElement(node, tabsize = 0) {
  if (node.type === NodeTypes8.ELEMENT) {
    if (node.children.length === 0) {
      return tab(tabsize) + `<${renderTag(node)} />`;
    }
    return tab(tabsize) + `<${renderTag(node)}>
` + node.children.map((c) => {
      return renderElement(c, tabsize + 2) + "\n";
    }).join("") + tab(tabsize) + `</${node.tag}>`;
  }
  if (node.type === NodeTypes8.TEXT) {
    return tab(tabsize) + node.content.trim();
  }
  if (node.loc.source) {
    return tab(tabsize) + node.loc.source;
  }
  throw new Error(`unhandled node type: ${node.type}`);
}
var renderTemplateAst = (templateAst) => {
  let template = "";
  templateAst.children.forEach((node) => {
    template += renderElement(node);
  });
  return template;
};

// ../virtual-components/lib/ast-transform/render/indent.ts
var getNodeIndent = (node, source) => {
  let indent = 0;
  for (let i = node.loc.start.offset - 1; i >= 0; i--) {
    if (source[i] === "\n") {
      break;
    }
    indent++;
  }
  return indent;
};
var addIndent = (source, indent) => {
  return source.replace(/\n/g, `
${" ".repeat(indent)}`);
};

// ../virtual-components/lib/ast-transform/transform-vue-file.ts
var transformNestedComponents = (source, virtualComponents2) => {
  let sourceString = new MagicString2(`<template>${source}</template>`);
  const templateAst = parseVue(sourceString.toString()).descriptor.template?.ast;
  if (!templateAst) {
    throw new Error("No template found in component while transforming nested virtual components");
  }
  const globalImports = [];
  walkTags(templateAst, (node) => {
    const componentName = node.tag;
    const component = virtualComponents2.find((c) => c.name === componentName);
    if (!component) {
      return;
    }
    const intend = getNodeIndent(node, sourceString.toString());
    const { ast, imports } = transformAstNode(node, component);
    const newTemplateString = addIndent(renderTemplateAst(ast), intend);
    const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents2);
    sourceString.overwrite(
      node.loc.start.offset,
      node.loc.end.offset,
      code.toString()
    );
    globalImports.push(imports.map((i) => `import { ${i} } from 'virtual-components:${component.name}'`).join("\n"));
    globalImports.push(...nestedImports);
  });
  return {
    code: sourceString.toString().slice("<template>".length, -"</template>".length),
    imports: globalImports
  };
};
var transformVue = (source, virtualComponents2) => {
  const sfcParseResult = parseVue(source);
  const templateAst = sfcParseResult.descriptor.template?.ast;
  if (!templateAst) {
    throw new Error("No template found in component while transforming vue file");
  }
  let sourceString = new MagicString2(source);
  let fileImports = [];
  walkTags(templateAst, (node) => {
    const componentName = node.tag;
    const component = virtualComponents2.find((c) => c.name === componentName);
    if (!component) {
      return;
    }
    const intend = getNodeIndent(node, source);
    try {
      const { ast, imports } = transformAstNode(node, component);
      const newTemplateString = addIndent(renderTemplateAst(ast), intend);
      const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents2);
      sourceString.overwrite(
        node.loc.start.offset,
        node.loc.end.offset,
        code.toString()
      );
      fileImports.push(imports.map((i) => `import { ${i} } from 'virtual-components:${component.name}'`).join("\n"));
      fileImports.push(...nestedImports);
    } catch (e) {
      console.error(`Failed to transform component ${componentName}`, e);
    }
  });
  fileImports = fileImports.filter((i) => i.length > 0);
  fileImports = [...new Set(fileImports)];
  if (sfcParseResult.descriptor.script) {
    const start = sfcParseResult.descriptor.script.loc.start.offset;
    sourceString.appendLeft(start, fileImports.join("\n") + "\n");
  } else {
    const lang = sfcParseResult.descriptor.scriptSetup?.lang ? `lang="${sfcParseResult.descriptor.scriptSetup.lang}"` : "";
    sourceString.prepend(`<script ${lang}>
${fileImports.join("\n") + "\n"}</script>

`);
  }
  return sourceString;
};

// ../virtual-components/lib/create-virtual-component.ts
import { parse as parseVue2, compileScript as compileScript2 } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";

// ../virtual-components/lib/create-virtual-component/define-props.ts
var extractArgs = (code, index) => {
  let start = code.indexOf("defineProps(", index);
  if (start === -1) {
    return;
  }
  start = start + "defineProps(".length;
  let openParens = 1;
  let funcStart = start;
  while (openParens > 0 && funcStart < code.length) {
    funcStart++;
    if (code[funcStart] === "(") openParens++;
    if (code[funcStart] === ")") openParens--;
  }
  return code.slice(start, funcStart).trim();
};
var extractGenericArgs = (code, index) => {
  let start = code.indexOf("defineProps<", index);
  if (start === -1) {
    return;
  }
  start = start + "defineProps<".length;
  let openParens = 1;
  let funcStart = start;
  while (openParens > 0 && funcStart < code.length) {
    funcStart++;
    if (code[funcStart] === "<") openParens++;
    if (code[funcStart] === ">") openParens--;
  }
  return code.slice(start, funcStart).trim();
};
var parseObjectKeys = (code) => {
  if (code.indexOf("{") === -1) {
    console.error("Unable to find object keys", code);
    throw new Error("Unable to find object keys");
  }
  let start = code.indexOf("{") + 1;
  let openBraces = 1;
  let keyStart = start;
  const keys = [];
  while (openBraces > 0 && keyStart < code.length) {
    keyStart++;
    if (code[keyStart] === "{") openBraces++;
    if (code[keyStart] === "}") openBraces--;
    if (openBraces > 1) {
      continue;
    }
    if (code[keyStart] === ":") {
      keys.push(code.slice(start, keyStart).trim());
      continue;
    }
    if (code[keyStart] === ",") {
      start = keyStart + 1;
    }
  }
  return keys;
};
var extractDefineProps = (code) => {
  let index = 0;
  const args = extractArgs(code, index);
  if (args) {
    return parseObjectKeys(args);
  }
  const genericArgs = extractGenericArgs(code, index);
  if (genericArgs) {
    return parseObjectKeys(genericArgs);
  }
  return [];
};
var replaceCharAt = (str, index, newChar) => {
  return str.substring(0, index) + newChar + str.substring(index + 1);
};
var extractPropDefaults = (code) => {
  const definePropsStart = code.indexOf("defineProps");
  const definePropsEnd = definePropsStart + "defineProps".length;
  if (code[definePropsEnd] === "<") {
    let index = definePropsStart;
    let objStart = -1;
    let openBraces = 0;
    let str = "";
    while (index > 0) {
      if (openBraces === 1 && code[index] === "=") {
        code = replaceCharAt(code, index, ":");
      }
      if (code[index] === "}") {
        if (openBraces === 0) {
          objStart = index + 1;
        }
        openBraces++;
      }
      if (code[index] === "{") {
        if (openBraces === 1) {
          str = code.slice(index, objStart);
          break;
        }
        openBraces--;
      }
      index--;
    }
    if (!str) {
      return {};
    }
    const newCode = `(${str})`;
    return execute(newCode);
  }
  if (code[definePropsEnd] === "(") {
    let index = definePropsStart;
    let openParens = 0;
    let str = "";
    while (index < code.length) {
      if (code[index] === ")") {
        openParens--;
        if (openParens === 0) {
          str = code.slice(definePropsEnd, index + 1);
          break;
        }
      }
      if (code[index] === "(") {
        openParens++;
      }
      index++;
    }
    if (!str.trim()) {
      return {};
    }
    const newCode = `(${str})`;
    const propsDeclaration = execute(newCode);
    const propsDefaults = {};
    Object.keys(propsDeclaration).forEach((key) => {
      if (!propsDeclaration[key]?.default) {
        return;
      }
      propsDefaults[key] = String(propsDeclaration[key]?.default);
    });
    return propsDefaults;
  }
  return {};
};

// ../virtual-components/lib/create-virtual-component/script-setup.ts
import { compileScript } from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js";
import ts from "file:///Users/m0ksem/Code/vuestic-ui/node_modules/typescript/lib/typescript.js";
var walk2 = (node, cb) => {
  cb(node);
  if ("body" in node && Array.isArray(node.body)) {
    for (const child of node.body) {
      walk2(child, cb);
    }
  }
  if ("expression" in node && node.type === "ExpressionStatement") {
    walk2(node.expression, cb);
  }
  if ("left" in node) {
    walk2(node.left, cb);
  }
  if ("right" in node) {
    walk2(node.right, cb);
  }
  if ("object" in node) {
    walk2(node.object, cb);
  }
  if (node.type === "MemberExpression") {
    walk2(node.property, cb);
  }
  if (node.type === "TemplateLiteral" && "expressions" in node) {
    for (const expression of node.expressions) {
      walk2(expression, cb);
    }
  }
};
var transpileTs = (code) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      strict: false
    }
  });
};
var createScriptSetupContext = (scriptSetup) => {
  if (!scriptSetup.scriptSetup) {
    return {
      functions: [],
      variables: [],
      functionNames: []
    };
  }
  const script = compileScript(scriptSetup, { id: "test" });
  if (!script.scriptSetupAst) {
    return {
      functions: [],
      variables: [],
      functionNames: []
    };
  }
  const source = scriptSetup.scriptSetup?.content ?? "";
  const functions = [];
  const functionNames = [];
  const variables = [];
  script.scriptSetupAst.forEach((node) => {
    walk2(node, (node2) => {
      if (node2.type === "FunctionDeclaration") {
        const name = node2.id.name;
        functionNames.push(name);
        functions.push(source.slice(node2.start, node2.end));
      }
      if (node2.type === "VariableDeclaration") {
        const dec = node2;
        if (dec.declarations.length > 1) {
          throw new Error("Only one variable declaration is supported");
        }
        if (dec.declarations[0].init?.type === "ArrowFunctionExpression") {
          if (dec.declarations[0].id.type !== "Identifier") {
            throw new Error("Only identifier declarations are supported. No destructuring.");
          }
          functions.push(source.slice(node2.start, node2.end));
          functionNames.push(dec.declarations[0].id.name);
        } else if (node2) {
          variables.push(source.slice(node2.start, node2.end));
        }
      }
    });
  });
  functions.forEach((fn, i) => {
    functions[i] = transpileTs(fn).outputText;
  });
  return {
    functions,
    functionNames,
    variables
  };
};

// ../virtual-components/lib/execute/execute-module.ts
var executeModule = async (scriptCode) => {
  const module = await import(`data:text/javascript,${encodeURIComponent(scriptCode)}`);
  return module;
};

// ../virtual-components/lib/create-virtual-component.ts
var createVirtualComponent = async (componentName, source) => {
  const result = parseVue2(source);
  if (!result.descriptor.template) {
    throw new Error(`No template found in component ${componentName}`);
  }
  if (!result.descriptor.template.ast) {
    throw new Error(`No AST found in component ${componentName}`);
  }
  return {
    name: componentName,
    templateSource: result.descriptor.template.content,
    templateAst: result.descriptor.template.ast,
    source: source.trim(),
    script: {
      props: extractDefineProps(source),
      propsDefaults: extractPropDefaults(source),
      scriptSetupContent: createScriptSetupContext(result.descriptor),
      scriptSetup: executeModule(compileScript2(result.descriptor, { id: "test" }).content)
      // onCompileFunction: extractFunctionBodies(source)
    }
  };
};

// ../virtual-components/plugin.ts
import { readdir, readFile } from "fs/promises";
import path from "path";
var resolveComponentsFromComponentsDir = async (componentsDir = "./src/components") => {
  return Promise.all((await readdir(componentsDir)).filter((file) => file.endsWith(".vue")).map(async (file) => {
    const name = file.replace(".vue", "");
    const content = await readFile(path.resolve(componentsDir, file), "utf-8");
    return createVirtualComponent(name, content);
  }));
};
var components = await resolveComponentsFromComponentsDir();
var virtualComponents = {
  name: "vuestic:virtual-components",
  resolveId(id) {
    if (id.startsWith("virtual-components:")) {
      return id;
    }
  },
  load(id) {
    if (id.startsWith("virtual-components:")) {
      const componentName = id.replace("virtual-components:", "");
      const component = components.find((c) => c.name === componentName);
      if (!component) {
        return;
      }
      const { functions, functionNames } = component.script.scriptSetupContent;
      return functions.join("\n") + `export { ${functionNames.join(", ")} }`;
    }
  },
  transform(code, id) {
    if (!id.endsWith(".vue")) return null;
    if (!id.includes("playground/src")) return null;
    const result = transformVue(code, components);
    return {
      code: result.toString(),
      map: result.generateMap({ hires: false })
    };
  },
  configureServer(server) {
    server.watcher.add("./src/components");
    server.watcher.on("change", async (file) => {
      if (file.endsWith(".vue")) {
        components = await resolveComponentsFromComponentsDir();
      }
    });
  }
};

// ../vite-plugin/index.ts
var logger = createLogger("info", {
  prefix: "[vuestic:compiler]"
});
var defaultOptions = {
  devtools: false,
  cssLayers: false,
  config: {
    configPath: "vuestic.config.ts"
  }
};
var vuestic = (options = {}) => {
  options = mergeDeep(defaultOptions, options);
  const plugins = [];
  plugins.push(virtualComponents);
  return plugins;
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/m0ksem/Code/vuestic-ui/packages/compiler/playground/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vuestic({
      devtools: false
    }),
    vue(),
    Inspect()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@vuestic/compiler/devtools": fileURLToPath(new URL("../devtools/client/index.ts", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    minify: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vdml0ZS1wbHVnaW4vaW5kZXgudHMiLCAiLi4vc2hhcmVkL21lcmdlLWRlZXAudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybS12dWUtZmlsZS50cyIsICIuLi92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vd2Fsay50cyIsICIuLi92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2NyZWF0ZS1jb21waWxlci1jb250ZXh0LnRzIiwgIi4uL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvdXRpbHMudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlL2V4ZWN1dGUudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlL3ByaW50LXJlbmRlcmluZy1jb250ZXh0LnRzIiwgIi4uL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9hc3QtaGVscGVycy50cyIsICIuLi92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1zbG90LW5vZGUudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tcHJvcC1iaW5kLnRzIiwgIi4uL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtLWludGVycG9sYXRpb24udHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tcm9vdC1ub2RlLWF0dHJzLnRzIiwgIi4uL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS90cmFuc2Zvcm0tbm9kZS50cyIsICIuLi92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vcmVuZGVyL3JlbmRlci10ZW1wbGF0ZS1hc3QudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3JlbmRlci9pbmRlbnQudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL2xpYi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQvZGVmaW5lLXByb3BzLnRzIiwgIi4uL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50L3NjcmlwdC1zZXR1cC50cyIsICIuLi92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2V4ZWN1dGUvZXhlY3V0ZS1tb2R1bGUudHMiLCAiLi4vdmlydHVhbC1jb21wb25lbnRzL3BsdWdpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3BsYXlncm91bmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvcGxheWdyb3VuZC92aXRlLmNvbmZpZy50c1wiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0J1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5cbmltcG9ydCB7IHZ1ZXN0aWMgfSBmcm9tICcuLi92aXRlLXBsdWdpbidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWVzdGljKHsgZGV2dG9vbHM6IGZhbHNlXG4gICAgfSkgYXMgYW55LFxuICAgIHZ1ZSgpLFxuICAgIEluc3BlY3QoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdAdnVlc3RpYy9jb21waWxlci9kZXZ0b29scyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vZGV2dG9vbHMvY2xpZW50L2luZGV4LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogZmFsc2UsXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpdGUtcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXRlLXBsdWdpbi9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXRlLXBsdWdpbi9pbmRleC50c1wiO2ltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgUGx1Z2luIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgZGV2dG9vbHMsIFBsdWdpbk9wdGlvbnMgYXMgRGV2dG9vbHNQbHVnaW5PcHRpb25zIH0gZnJvbSBcIi4uL2RldnRvb2xzXCJcbmltcG9ydCB7IGNzc0xheWVycyB9IGZyb20gXCIuLi9jc3MtbGF5ZXJzXCJcbmltcG9ydCB7IHZ1ZXN0aWNDb25maWcsIE9wdGlvbnMgYXMgVnVlc3RpY0NvbmZpZ1BsdWdpbk9wdGlvbnMgfSBmcm9tIFwiLi4vdnVlc3RpYy1jb25maWdcIlxuaW1wb3J0IHsgbWVyZ2VEZWVwIH0gZnJvbSBcIi4uL3NoYXJlZC9tZXJnZS1kZWVwXCJcbmltcG9ydCB7IHZpcnR1YWxDb21wb25lbnRzIH0gZnJvbSBcIi4uL3ZpcnR1YWwtY29tcG9uZW50c1wiXG5cbnR5cGUgT3B0aW9ucyA9IHtcbiAgLyoqIEBkZWZhdWx0IHRydWUgKi9cbiAgZGV2dG9vbHM/OiBib29sZWFuIHwgRGV2dG9vbHNQbHVnaW5PcHRpb25zLFxuXG4gIC8qKlxuICAgKiBBZGRzIENTUyBsYXllcnMgdG8gVnVlc3RpYyBVSVxuICAgKiBIZWxwcyBjb250cm9sIHRoZSBvcmRlciBvZiBDU1MgaW4gdGhlIGZpbmFsIGJ1bmRsZVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKlxuICAgKiBBZGQgYHZ1ZXN0aWMuY29tcG9uZW50c2AgYW5kIGB2dWVzdGljLnN0eWxlc2AgQ1NTIGxheWVyc1xuICAgKlxuICAgKiBAbm90aWNlIFRoaXMgd2lsbCBtYWtlIFZ1ZXN0aWMgc3R5bGVzIGxlc3MgaW1wb3J0YW50LiBNYWtlIHN1cmUgeW91IGRvbid0IGhhdmUgYW55IGdsb2JhbCBjb25mbGljdGluZyBzdHlsZXMuXG4gICAqIEZvciBleGFtcGxlLiB0YWlsd2luZCBoYXZlIG5vcm1hbGl6ZSBjc3MgaW5jbHVkZWQuIEl0IG1heSBoYXZlIGhpZ2hlciBwcmlvcml0eSB0aGFuIFZ1ZXN0aWMgc3R5bGVzIGFuZCBjb21wb25lbnRzIG1pZ2h0IGxvb2sgYnJva2VuLlxuICAgKi9cbiAgY3NzTGF5ZXJzPzogYm9vbGVhbixcblxuICAvKipcbiAgICogUGF0aCB0byB0aGUgVnVlc3RpYyBjb25maWcgZmlsZVxuICAgKlxuICAgKiBAZGVmYXVsdCAndnVlc3RpYy5jb25maWcudHMnXG4gICAqXG4gICAqIE1ha2Ugc3VyZSB0byBpbmNsdWRlIGdlbmVyYXRlZCB0eXBlcyB0byB5b3VyIHRzY29uZmlnLmpzb25cbiAgICpcbiAgICogYGBganNvblxuICAgKiB7XG4gICAqICAgXCJpbmNsdWRlXCI6IFtcIm5vZGVfbW9kdWxlcy8udnVlc3RpYy8qLmQudHNcIiwgXCJzcmMvKipcXC8qLmQudHNcIl1cbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIGNvbmZpZz86IGJvb2xlYW4gfCBWdWVzdGljQ29uZmlnUGx1Z2luT3B0aW9ucyxcbn1cblxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCdpbmZvJywge1xuICBwcmVmaXg6ICdbdnVlc3RpYzpjb21waWxlcl0nXG59KVxuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogUmVxdWlyZWQ8T3B0aW9ucz4gPSB7XG4gIGRldnRvb2xzOiBmYWxzZSxcbiAgY3NzTGF5ZXJzOiBmYWxzZSxcbiAgY29uZmlnOiB7XG4gICAgY29uZmlnUGF0aDogJ3Z1ZXN0aWMuY29uZmlnLnRzJ1xuICB9LFxufVxuXG5leHBvcnQgY29uc3QgdnVlc3RpYyA9IChvcHRpb25zOiBPcHRpb25zID0ge30pOiBQbHVnaW5bXSA9PiB7XG4gIG9wdGlvbnMgPSBtZXJnZURlZXAoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpXG5cbiAgLy8gY29uc3QgZXh0cmFjdE9wdGlvbnMgPSAoa2V5OiBrZXlvZiBPcHRpb25zKSA9PiB7XG4gIC8vICAgLy8gQnVpbGQgZmFpbHMgd2l0aG91dCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IGNhc3RcbiAgLy8gICByZXR1cm4gdHlwZW9mIG9wdGlvbnNba2V5XSA9PT0gJ29iamVjdCcgPyBvcHRpb25zW2tleV0gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPiA6IHVuZGVmaW5lZFxuICAvLyB9XG5cbiAgY29uc3QgcGx1Z2lucyA9IFtdXG5cbiAgLy8gaWYgKG9wdGlvbnMuZGV2dG9vbHMgIT09IGZhbHNlKSB7XG4gIC8vICAgbG9nZ2VyLmluZm8oJ1VzaW5nIHZ1ZXN0aWM6ZGV2dG9vbHMnLCB7XG4gIC8vICAgICB0aW1lc3RhbXA6IHRydWUsXG4gIC8vICAgfSlcbiAgLy8gICBwbHVnaW5zLnB1c2goZGV2dG9vbHMoZXh0cmFjdE9wdGlvbnMoJ2RldnRvb2xzJykpKVxuICAvLyB9XG5cbiAgLy8gaWYgKG9wdGlvbnMuY3NzTGF5ZXJzICE9PSBmYWxzZSkge1xuICAvLyAgIGxvZ2dlci5pbmZvKCdVc2luZyB2dWVzdGljOmNzcy1sYXllcnMnLCB7XG4gIC8vICAgICB0aW1lc3RhbXA6IHRydWUsXG4gIC8vICAgfSlcbiAgLy8gICBwbHVnaW5zLnB1c2goY3NzTGF5ZXJzKVxuICAvLyB9XG5cbiAgLy8gaWYgKEJvb2xlYW4ob3B0aW9ucy5jb25maWcpKSB7XG4gIC8vICAgbG9nZ2VyLmluZm8oJ1VzaW5nIHZ1ZXN0aWM6Y29uZmlnJywge1xuICAvLyAgICAgdGltZXN0YW1wOiB0cnVlLFxuICAvLyAgIH0pXG4gIC8vICAgcGx1Z2lucy5wdXNoKC4uLnZ1ZXN0aWNDb25maWcoZXh0cmFjdE9wdGlvbnMoJ2NvbmZpZycpKSlcbiAgLy8gfVxuXG4gIHBsdWdpbnMucHVzaCh2aXJ0dWFsQ29tcG9uZW50cylcblxuICByZXR1cm4gcGx1Z2luc1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci9zaGFyZWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3NoYXJlZC9tZXJnZS1kZWVwLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3NoYXJlZC9tZXJnZS1kZWVwLnRzXCI7Ly8gQ29waWVkIGZyb20gdWkvc3JjL3V0aWxzL21lcmdlLWRlZXAudHNcblxuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmopXG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0cyBkZWVwXG4gKiBJZiBwcm9wZXJ0eSBpcyBhcnJheSwgaXQgd2lsbCByZXBsYWNlIHRhcmdldCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbWVyZ2VEZWVwID0gKHRhcmdldDogYW55LCBzb3VyY2U6IGFueSk6IGFueSA9PiB7XG4gIGlmICghaXNPYmplY3QodGFyZ2V0KSkge1xuICAgIHRhcmdldCA9IHt9XG4gIH1cblxuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldXG4gICAgY29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XVxuXG4gICAgaWYgKHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHNvdXJjZVZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0VmFsdWUpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBtZXJnZURlZXAoT2JqZWN0LmNyZWF0ZShcbiAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldFZhbHVlKSxcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModGFyZ2V0VmFsdWUpLFxuICAgICAgKSwgc291cmNlVmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlVmFsdWVcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG5leHBvcnQgY29uc3QgbWVyZ2VEZWVwTXVsdGlwbGUgPSAoLi4ub2JqZWN0czogYW55W10pOiBhbnkgPT4ge1xuICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKGFjYywgb2JqKSA9PiBtZXJnZURlZXAoYWNjLCBvYmopLCB7fSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtLXZ1ZS1maWxlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS90cmFuc2Zvcm0tdnVlLWZpbGUudHNcIjtpbXBvcnQgeyBNYWdpY1N0cmluZywgcGFyc2UgYXMgcGFyc2VWdWUgfSBmcm9tICdAdnVlL2NvbXBpbGVyLXNmYydcbmltcG9ydCB7IFZpcnR1YWxDb21wb25lbnQgfSBmcm9tIFwiLi4vY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50XCI7XG5pbXBvcnQgeyB3YWxrVGFncyB9IGZyb20gJy4vd2FsaydcbmltcG9ydCB7IHRyYW5zZm9ybUFzdE5vZGUgfSBmcm9tICcuL3RyYW5zZm9ybS1ub2RlJztcbmltcG9ydCB7IHJlbmRlclRlbXBsYXRlQXN0IH0gZnJvbSAnLi9yZW5kZXIvcmVuZGVyLXRlbXBsYXRlLWFzdCc7XG5pbXBvcnQgeyBnZXROb2RlSW5kZW50LCBhZGRJbmRlbnR9IGZyb20gJy4vcmVuZGVyL2luZGVudCdcblxuY29uc3QgdHJhbnNmb3JtTmVzdGVkQ29tcG9uZW50cyA9IChzb3VyY2U6IHN0cmluZywgdmlydHVhbENvbXBvbmVudHM6IFZpcnR1YWxDb21wb25lbnRbXSkgPT4ge1xuICBsZXQgc291cmNlU3RyaW5nID0gbmV3IE1hZ2ljU3RyaW5nKGA8dGVtcGxhdGU+JHtzb3VyY2V9PC90ZW1wbGF0ZT5gKVxuXG4gIGNvbnN0IHRlbXBsYXRlQXN0ID0gcGFyc2VWdWUoc291cmNlU3RyaW5nLnRvU3RyaW5nKCkpLmRlc2NyaXB0b3IudGVtcGxhdGU/LmFzdFxuXG4gIGlmICghdGVtcGxhdGVBc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRlbXBsYXRlIGZvdW5kIGluIGNvbXBvbmVudCB3aGlsZSB0cmFuc2Zvcm1pbmcgbmVzdGVkIHZpcnR1YWwgY29tcG9uZW50cycpXG4gIH1cblxuICBjb25zdCBnbG9iYWxJbXBvcnRzID0gW10gYXMgc3RyaW5nW11cblxuICB3YWxrVGFncyh0ZW1wbGF0ZUFzdCwgKG5vZGUpID0+IHtcbiAgICBjb25zdCBjb21wb25lbnROYW1lID0gbm9kZS50YWdcbiAgICBjb25zdCBjb21wb25lbnQgPSB2aXJ0dWFsQ29tcG9uZW50cy5maW5kKChjKSA9PiBjLm5hbWUgPT09IGNvbXBvbmVudE5hbWUpXG5cbiAgICBpZiAoIWNvbXBvbmVudCkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgaW50ZW5kID0gZ2V0Tm9kZUluZGVudChub2RlLCBzb3VyY2VTdHJpbmcudG9TdHJpbmcoKSlcblxuICAgIGNvbnN0IHsgYXN0LCBpbXBvcnRzIH0gPSB0cmFuc2Zvcm1Bc3ROb2RlKG5vZGUsIGNvbXBvbmVudClcbiAgICBjb25zdCBuZXdUZW1wbGF0ZVN0cmluZyA9IGFkZEluZGVudChyZW5kZXJUZW1wbGF0ZUFzdChhc3QpLCBpbnRlbmQpXG5cbiAgICBjb25zdCB7IGNvZGUsIGltcG9ydHM6IG5lc3RlZEltcG9ydHMgfSA9IHRyYW5zZm9ybU5lc3RlZENvbXBvbmVudHMobmV3VGVtcGxhdGVTdHJpbmcsIHZpcnR1YWxDb21wb25lbnRzKVxuXG4gICAgc291cmNlU3RyaW5nLm92ZXJ3cml0ZShcbiAgICAgIG5vZGUubG9jLnN0YXJ0Lm9mZnNldCxcbiAgICAgIG5vZGUubG9jLmVuZC5vZmZzZXQsXG4gICAgICBjb2RlLnRvU3RyaW5nKClcbiAgICApXG5cbiAgICBnbG9iYWxJbXBvcnRzLnB1c2goaW1wb3J0cy5tYXAoKGkpID0+IGBpbXBvcnQgeyAke2l9IH0gZnJvbSAndmlydHVhbC1jb21wb25lbnRzOiR7Y29tcG9uZW50Lm5hbWV9J2ApLmpvaW4oJ1xcbicpKVxuICAgIGdsb2JhbEltcG9ydHMucHVzaCguLi5uZXN0ZWRJbXBvcnRzKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgY29kZTogIHNvdXJjZVN0cmluZy50b1N0cmluZygpLnNsaWNlKCc8dGVtcGxhdGU+Jy5sZW5ndGgsIC0nPC90ZW1wbGF0ZT4nLmxlbmd0aCksXG4gICAgaW1wb3J0czogZ2xvYmFsSW1wb3J0c1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1WdWUgPSAoc291cmNlOiBzdHJpbmcsIHZpcnR1YWxDb21wb25lbnRzOiBWaXJ0dWFsQ29tcG9uZW50W10pID0+IHtcbiAgY29uc3Qgc2ZjUGFyc2VSZXN1bHQgPSBwYXJzZVZ1ZShzb3VyY2UpXG4gIGNvbnN0IHRlbXBsYXRlQXN0ID0gc2ZjUGFyc2VSZXN1bHQuZGVzY3JpcHRvci50ZW1wbGF0ZT8uYXN0XG5cbiAgaWYgKCF0ZW1wbGF0ZUFzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gdGVtcGxhdGUgZm91bmQgaW4gY29tcG9uZW50IHdoaWxlIHRyYW5zZm9ybWluZyB2dWUgZmlsZScpXG4gIH1cblxuICBsZXQgc291cmNlU3RyaW5nID0gbmV3IE1hZ2ljU3RyaW5nKHNvdXJjZSlcbiAgbGV0IGZpbGVJbXBvcnRzID0gW10gYXMgc3RyaW5nW11cblxuICB3YWxrVGFncyh0ZW1wbGF0ZUFzdCwgKG5vZGUpID0+IHtcbiAgICBjb25zdCBjb21wb25lbnROYW1lID0gbm9kZS50YWdcbiAgICBjb25zdCBjb21wb25lbnQgPSB2aXJ0dWFsQ29tcG9uZW50cy5maW5kKChjKSA9PiBjLm5hbWUgPT09IGNvbXBvbmVudE5hbWUpXG5cbiAgICBpZiAoIWNvbXBvbmVudCkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgaW50ZW5kID0gZ2V0Tm9kZUluZGVudChub2RlLCBzb3VyY2UpXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhc3QsIGltcG9ydHMgfSA9IHRyYW5zZm9ybUFzdE5vZGUobm9kZSwgY29tcG9uZW50KVxuICAgICAgY29uc3QgbmV3VGVtcGxhdGVTdHJpbmcgPSBhZGRJbmRlbnQocmVuZGVyVGVtcGxhdGVBc3QoYXN0KSwgaW50ZW5kKVxuXG4gICAgICBjb25zdCB7IGNvZGUsIGltcG9ydHM6IG5lc3RlZEltcG9ydHMgfSA9IHRyYW5zZm9ybU5lc3RlZENvbXBvbmVudHMobmV3VGVtcGxhdGVTdHJpbmcsIHZpcnR1YWxDb21wb25lbnRzKVxuXG4gICAgICBzb3VyY2VTdHJpbmcub3ZlcndyaXRlKFxuICAgICAgICBub2RlLmxvYy5zdGFydC5vZmZzZXQsXG4gICAgICAgIG5vZGUubG9jLmVuZC5vZmZzZXQsXG4gICAgICAgIGNvZGUudG9TdHJpbmcoKVxuICAgICAgKVxuXG4gICAgICBmaWxlSW1wb3J0cy5wdXNoKGltcG9ydHMubWFwKChpKSA9PiBgaW1wb3J0IHsgJHtpfSB9IGZyb20gJ3ZpcnR1YWwtY29tcG9uZW50czoke2NvbXBvbmVudC5uYW1lfSdgKS5qb2luKCdcXG4nKSlcbiAgICAgIGZpbGVJbXBvcnRzLnB1c2goLi4ubmVzdGVkSW1wb3J0cylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gdHJhbnNmb3JtIGNvbXBvbmVudCAke2NvbXBvbmVudE5hbWV9YCwgZSlcbiAgICB9XG4gIH0pXG5cbiAgZmlsZUltcG9ydHMgPSBmaWxlSW1wb3J0cy5maWx0ZXIoKGkpID0+IGkubGVuZ3RoID4gMClcbiAgZmlsZUltcG9ydHMgPSBbLi4ubmV3IFNldChmaWxlSW1wb3J0cyldXG5cbiAgaWYgKHNmY1BhcnNlUmVzdWx0LmRlc2NyaXB0b3Iuc2NyaXB0KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBzZmNQYXJzZVJlc3VsdC5kZXNjcmlwdG9yLnNjcmlwdC5sb2Muc3RhcnQub2Zmc2V0XG5cbiAgICBzb3VyY2VTdHJpbmcuYXBwZW5kTGVmdChzdGFydCwgZmlsZUltcG9ydHMuam9pbignXFxuJykgKyAnXFxuJylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsYW5nID0gc2ZjUGFyc2VSZXN1bHQuZGVzY3JpcHRvci5zY3JpcHRTZXR1cD8ubGFuZyA/IGBsYW5nPVwiJHtzZmNQYXJzZVJlc3VsdC5kZXNjcmlwdG9yLnNjcmlwdFNldHVwLmxhbmd9XCJgIDogJydcbiAgICBzb3VyY2VTdHJpbmcucHJlcGVuZChgPHNjcmlwdCAke2xhbmd9PlxcbiR7ZmlsZUltcG9ydHMuam9pbignXFxuJykgKyAnXFxuJ308L3NjcmlwdD5cXG5cXG5gKVxuICB9XG5cbiAgcmV0dXJuIHNvdXJjZVN0cmluZ1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS93YWxrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS93YWxrLnRzXCI7aW1wb3J0IHsgVGVtcGxhdGVDaGlsZE5vZGUsIFJvb3ROb2RlLCBFbGVtZW50Tm9kZSwgTm9kZVR5cGVzLCBFbGVtZW50VHlwZXMsIEF0dHJpYnV0ZU5vZGUsIERpcmVjdGl2ZU5vZGUsIFRleHROb2RlLCBJbnRlcnBvbGF0aW9uTm9kZSB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIlxuXG5leHBvcnQgY29uc3Qgd2FsayA9IChub2RlOiBUZW1wbGF0ZUNoaWxkTm9kZSB8IFJvb3ROb2RlLCBjYjogKG5vZGU6IFRlbXBsYXRlQ2hpbGROb2RlLCBwYXJlbnQ6IFRlbXBsYXRlQ2hpbGROb2RlIHwgUm9vdE5vZGUpID0+IHZvaWQpID0+IHtcbiAgaWYgKCEoJ2NoaWxkcmVuJyBpbiBub2RlKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgY2hpbGRyZW4gPSBbLi4ubm9kZS5jaGlsZHJlbl1cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3ltYm9sJykge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlcy5TSU1QTEVfRVhQUkVTU0lPTikge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjYihjaGlsZCwgbm9kZSlcblxuICAgIGlmIChub2RlLmNoaWxkcmVuLmluY2x1ZGVzKGNoaWxkIGFzIGFueSkpIHtcbiAgICAgIHdhbGsoY2hpbGQsIGNiKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgd2Fsa1RhZ3MgPSAobm9kZTogUm9vdE5vZGUsIGNiOiAobm9kZTogRWxlbWVudE5vZGUpID0+IHZvaWQpID0+IHtcbiAgd2Fsayhub2RlLCAobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlcy5FTEVNRU5UICYmIG5vZGUudGFnVHlwZSA9PT0gRWxlbWVudFR5cGVzLkNPTVBPTkVOVCkge1xuICAgICAgY2Iobm9kZSlcbiAgICB9XG4gIH0pXG59XG5cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9jcmVhdGUtY29tcGlsZXItY29udGV4dC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2NyZWF0ZS1jb21waWxlci1jb250ZXh0LnRzXCI7aW1wb3J0IHsgTm9kZVR5cGVzLCB0eXBlIFRlbXBsYXRlQ2hpbGROb2RlLCB0eXBlIEVsZW1lbnROb2RlLCBEaXJlY3RpdmVOb2RlIH0gZnJvbSBcIkB2dWUvY29tcGlsZXItY29yZVwiO1xuaW1wb3J0IHsgaXNOb2RlVGVtcGxhdGVTbG90LCBpc1Byb3BBdHRyaWJ1dGUsIGlzUHJvcERpcmVjdGl2ZSwgdG9DYW1lbENhc2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgdHlwZSBWaXJ0dWFsQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBjcmVhdGVJblRlbXBsYXRlRXhlY3V0ZXIgfSBmcm9tIFwiLi9leGVjdXRlL3ByaW50LXJlbmRlcmluZy1jb250ZXh0XCI7XG5cbmNvbnN0IGZpbmRTbG90TmFtZSA9IChjaGlsZDogRWxlbWVudE5vZGUpID0+IHtcbiAgZm9yIChjb25zdCBwcm9wIG9mIGNoaWxkLnByb3BzKSB7XG4gICAgaWYgKHByb3AudHlwZSA9PT0gTm9kZVR5cGVzLkRJUkVDVElWRSkge1xuICAgICAgaWYgKHByb3AuYXJnPy50eXBlID09PSBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04pIHtcbiAgICAgICAgcmV0dXJuIHByb3AuYXJnLmNvbnRlbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBjcmVhdGVDb21waWxlckNvbnRleHRTbG90cyA9IChub2RlOiBFbGVtZW50Tm9kZSkgPT4ge1xuICBjb25zdCBkaXJlY3RpdmVzID0gbm9kZS5wcm9wcy5maWx0ZXIoKHByb3ApID0+IHByb3AudHlwZSA9PT0gTm9kZVR5cGVzLkRJUkVDVElWRSlcblxuICBjb25zdCB0ZW1wbGF0ZVNsb3RzID0gbm9kZS5jaGlsZHJlblxuICAgIC5maWx0ZXIoaXNOb2RlVGVtcGxhdGVTbG90KVxuXG4gIGNvbnN0IGRlZmF1bHRTbG90Tm9kZXMgPSBub2RlLmNoaWxkcmVuXG4gICAgLmZpbHRlcigoY2hpbGQpID0+ICFpc05vZGVUZW1wbGF0ZVNsb3QoY2hpbGQpKVxuXG4gIGNvbnN0IHNsb3RzID0ge30gYXMgUmVjb3JkPHN0cmluZywgeyBuYW1lOiBzdHJpbmcsIGNoaWxkcmVuOiBUZW1wbGF0ZUNoaWxkTm9kZVtdIH0+XG4gIHRlbXBsYXRlU2xvdHMuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICBjb25zdCBzbG90TmFtZSA9IGZpbmRTbG90TmFtZShjaGlsZClcblxuICAgIGlmICghc2xvdE5hbWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNsb3RzW3Nsb3ROYW1lXSA9IHtcbiAgICAgIG5hbWU6IHNsb3ROYW1lLFxuICAgICAgY2hpbGRyZW46IGNoaWxkLmNoaWxkcmVuXG4gICAgfVxuICB9KVxuXG4gIGlmIChkZWZhdWx0U2xvdE5vZGVzLmxlbmd0aCkge1xuICAgIGNvbnN0IHNsb3REaXJlY3RpdmUgPSBkaXJlY3RpdmVzLmZpbmQoKGRpcikgPT4gZGlyLm5hbWUgPT09ICdzbG90JylcblxuICAgIGlmIChzbG90RGlyZWN0aXZlICYmIHNsb3REaXJlY3RpdmUuYXJnKSB7XG4gICAgICBjb25zdCBzbG90TmFtZSA9ICdjb250ZW50JyBpbiBzbG90RGlyZWN0aXZlLmFyZyA/IHNsb3REaXJlY3RpdmUuYXJnLmNvbnRlbnQgOiAnZGVmYXVsdCdcblxuICAgICAgZGlyZWN0aXZlcy5zcGxpY2UoZGlyZWN0aXZlcy5pbmRleE9mKHNsb3REaXJlY3RpdmUpLCAxKVxuXG4gICAgICBzbG90c1tzbG90TmFtZV0gPSB7XG4gICAgICAgIG5hbWU6IHNsb3ROYW1lLFxuICAgICAgICBjaGlsZHJlbjogZGVmYXVsdFNsb3ROb2Rlc1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzbG90cy5kZWZhdWx0ID0ge1xuICAgICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICAgIGNoaWxkcmVuOiBkZWZhdWx0U2xvdE5vZGVzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNsb3RzXG59XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG5vZGU6IEVsZW1lbnROb2RlLCBjb21wb25lbnQ6IFZpcnR1YWxDb21wb25lbnQpID0+IHtcbiAgY29uc3Qgc3RhdGljUHJvcHMgPSBbXSBhcyB7IG5hbWU6IHN0cmluZywgcmF3TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkIH1bXVxuICBjb25zdCBkeW5hbWljUHJvcHMgPSBbXSBhcyB7IG5hbWU6IHN0cmluZywgcmF3TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXVxuICBjb25zdCBzdGF0aWNBdHRycyA9IFtdIGFzIHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXVxuICBjb25zdCBkeW5hbWljQXR0cnMgPSBbXSBhcyB7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W11cblxuICBjb25zdCBkZWZpbmVkUHJvcHMgPSBjb21wb25lbnQuc2NyaXB0LnByb3BzXG4gIGNvbnN0IGRlZmF1bHRQcm9wcyA9IGNvbXBvbmVudC5zY3JpcHQucHJvcHNEZWZhdWx0c1xuXG4gIGNvbnN0IGRpcmVjdGl2ZXMgPSBbXSBhcyBEaXJlY3RpdmVOb2RlW11cblxuICBub2RlLnByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICBpZiAoaXNQcm9wQXR0cmlidXRlKHByb3ApKSB7XG4gICAgICBpZiAoZGVmaW5lZFByb3BzLmluY2x1ZGVzKHByb3AubmFtZSkpIHtcbiAgICAgICAgc3RhdGljUHJvcHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogdG9DYW1lbENhc2UocHJvcC5uYW1lKSxcbiAgICAgICAgICByYXdOYW1lOiBwcm9wLm5hbWUsXG4gICAgICAgICAgdmFsdWU6IHByb3AudmFsdWU/LmNvbnRlbnQgPz8gZGVmYXVsdFByb3BzW3Byb3AubmFtZV1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRpY0F0dHJzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHRvQ2FtZWxDYXNlKHByb3AubmFtZSksXG4gICAgICAgICAgdmFsdWU6IHByb3AudmFsdWU/LmNvbnRlbnQgPz8gJ3RydWUnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzUHJvcERpcmVjdGl2ZShwcm9wKSkge1xuICAgICAgaWYgKHByb3AubmFtZSA9PT0gJ2JpbmQnICYmIHByb3AuYXJnPy50eXBlID09PSBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04gJiYgcHJvcC5leHA/LnR5cGUgPT09IE5vZGVUeXBlcy5TSU1QTEVfRVhQUkVTU0lPTikge1xuICAgICAgICBjb25zdCBuYW1lID0gdG9DYW1lbENhc2UocHJvcC5hcmcuY29udGVudClcblxuICAgICAgICBpZiAoZGVmaW5lZFByb3BzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgZHluYW1pY1Byb3BzLnB1c2goe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHJhd05hbWU6IHByb3AuYXJnLmNvbnRlbnQsXG4gICAgICAgICAgICB2YWx1ZTogcHJvcC5leHAuY29udGVudFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHluYW1pY0F0dHJzLnB1c2goe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wLmV4cC5jb250ZW50XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChbJ2lmJywgJ2ZvciddLmluY2x1ZGVzKHByb3AubmFtZSkpIHtcbiAgICAgICAgZGlyZWN0aXZlcy5wdXNoKHByb3ApXG4gICAgICB9IGVsc2UgaWYgKHByb3AubmFtZSA9PT0gJ3Nsb3QnKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVW5zdXBwb3J0ZWQgZGlyZWN0aXZlJywgKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGRpcmVjdGl2ZSAnICsgcHJvcC5uYW1lICsgJyBpbiAnICsgbm9kZS5sb2Muc291cmNlKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmVkUHJvcHMuZm9yRWFjaCgocHJvcE5hbWUpID0+IHtcbiAgICBjb25zdCBleGlzdHMgPSBzdGF0aWNQcm9wcy5maW5kKChwcm9wKSA9PiBwcm9wLm5hbWUgPT09IHByb3BOYW1lKVxuXG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIHN0YXRpY1Byb3BzLnB1c2goe1xuICAgICAgICBuYW1lOiB0b0NhbWVsQ2FzZShwcm9wTmFtZSksXG4gICAgICAgIHJhd05hbWU6IHByb3BOYW1lLFxuICAgICAgICB2YWx1ZTogZGVmYXVsdFByb3BzW3Byb3BOYW1lXSA/PyB1bmRlZmluZWRcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgZGlyZWN0aXZlcyxcbiAgICBzdGF0aWNQcm9wcyxcbiAgICBkeW5hbWljUHJvcHMsXG4gICAgc3RhdGljQXR0cnMsXG4gICAgZHluYW1pY0F0dHJzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXBpbGVyQ29udGV4dCA9IChub2RlOiBFbGVtZW50Tm9kZSwgY29tcG9uZW50OiBWaXJ0dWFsQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHsgdGFnIH0gPSBub2RlXG5cbiAgY29uc3Qge1xuICAgIHN0YXRpY1Byb3BzLFxuICAgIGR5bmFtaWNQcm9wcyxcbiAgICBzdGF0aWNBdHRycyxcbiAgICBkeW5hbWljQXR0cnMsXG4gICAgZGlyZWN0aXZlc1xuICB9ID0gY3JlYXRlUHJvcHMobm9kZSwgY29tcG9uZW50KVxuXG4gIGNvbnN0IHNsb3RzID0gY3JlYXRlQ29tcGlsZXJDb250ZXh0U2xvdHMobm9kZSlcblxuICBjb25zdCBpbXBvcnRzID0gW10gYXMgc3RyaW5nW11cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IHRhZy5yZXBsYWNlKC9eVmMvZywgJycpLFxuICAgIHRhZyxcbiAgICBjb21wb25lbnQsXG4gICAgcHJvcHM6IHN0YXRpY1Byb3BzLFxuICAgIGF0dHJzOiBzdGF0aWNBdHRycyxcbiAgICBkeW5hbWljUHJvcHMsXG4gICAgZHluYW1pY0F0dHJzLFxuICAgIGRpcmVjdGl2ZXMsXG4gICAgc2xvdHMsXG4gICAgaW1wb3J0cyxcbiAgICBleGVjdXRlOiBjcmVhdGVJblRlbXBsYXRlRXhlY3V0ZXIoe1xuICAgICAgcHJvcHM6IHN0YXRpY1Byb3BzLFxuICAgICAgZHluYW1pY1Byb3BzLFxuICAgICAgc2xvdHMsXG4gICAgICBpbXBvcnRzLFxuICAgICAgY29tcG9uZW50XG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBDb21waWxlckNvbnRleHQgPSBSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDb21waWxlckNvbnRleHQ+XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi91dGlscy50c1wiO2ltcG9ydCB7IEF0dHJpYnV0ZU5vZGUsIERpcmVjdGl2ZU5vZGUsIEVsZW1lbnRUeXBlcywgTm9kZVR5cGVzLCBUZW1wbGF0ZUNoaWxkTm9kZSwgVGVtcGxhdGVOb2RlIH0gZnJvbSBcIkB2dWUvY29tcGlsZXItY29yZVwiXG5cbmV4cG9ydCBjb25zdCBpc1Byb3BBdHRyaWJ1dGUgPSAocHJvcDogYW55KTogcHJvcCBpcyBBdHRyaWJ1dGVOb2RlID0+IHtcbiAgcmV0dXJuIHByb3AudHlwZSA9PT0gTm9kZVR5cGVzLkFUVFJJQlVURVxufVxuXG5leHBvcnQgY29uc3QgaXNQcm9wRGlyZWN0aXZlID0gKHByb3A6IGFueSk6IHByb3AgaXMgRGlyZWN0aXZlTm9kZSA9PiB7XG4gIHJldHVybiBwcm9wLnR5cGUgPT09IE5vZGVUeXBlcy5ESVJFQ1RJVkVcbn1cblxuZXhwb3J0IGNvbnN0IGlzTm9kZVRlbXBsYXRlU2xvdCA9IChub2RlOiBUZW1wbGF0ZUNoaWxkTm9kZSk6IG5vZGUgaXMgVGVtcGxhdGVOb2RlID0+IHtcbiAgcmV0dXJuIG5vZGUudHlwZSA9PT0gTm9kZVR5cGVzLkVMRU1FTlQgJiYgbm9kZS50YWdUeXBlID09PSBFbGVtZW50VHlwZXMuVEVNUExBVEVcbn1cblxuZXhwb3J0IGNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvLShbYS16MC05XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2V4ZWN1dGUvZXhlY3V0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2V4ZWN1dGUvZXhlY3V0ZS50c1wiO2ltcG9ydCB7IE1hZ2ljU3RyaW5nIH0gZnJvbSAnQHZ1ZS9jb21waWxlci1zZmMnXG5pbXBvcnQgeyBwYXJzZSwgTm9kZSwgU3RhdGVtZW50LCBNb2R1bGVEZWNsYXJhdGlvbiwgTWVtYmVyRXhwcmVzc2lvbiwgVGVtcGxhdGVMaXRlcmFsfSBmcm9tICdhY29ybidcbmltcG9ydCB7IENvbXBpbGVyQ29udGV4dCB9IGZyb20gJy4uL2NyZWF0ZS1jb21waWxlci1jb250ZXh0J1xuXG5leHBvcnQgY29uc3QgZXhlY3V0ZSA9IChjb2RlOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gKDAsIGV2YWwpKGNvZGUpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBjb25zb2xlLmVycm9yKGNvZGUpXG4gICAgLy8gY29uc29sZS5lcnJvcihlKVxuICAgIHJldHVybiBudWxsXG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZXhlY3V0ZSBjb2RlOiAke2NvZGV9YClcbiAgfVxufVxuXG5jb25zdCB3YWxrID0gKG5vZGU6IE5vZGUgfCBTdGF0ZW1lbnQgfCBNb2R1bGVEZWNsYXJhdGlvbiwgY2I6IChub2RlOiBOb2RlKSA9PiB2b2lkKSA9PiB7XG4gIGNiKG5vZGUpXG4gIGlmICgnZXhwcmVzc2lvbicgaW4gbm9kZSAmJiBub2RlLnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50Jykge1xuICAgIHdhbGsobm9kZS5leHByZXNzaW9uLCBjYilcbiAgfVxuICBpZiAoJ2xlZnQnIGluIG5vZGUpIHtcbiAgICB3YWxrKG5vZGUubGVmdCwgY2IpXG4gIH1cbiAgaWYgKCdyaWdodCcgaW4gbm9kZSkge1xuICAgIHdhbGsobm9kZS5yaWdodCwgY2IpXG4gIH1cbiAgaWYgKCdvYmplY3QnIGluIG5vZGUpIHtcbiAgICB3YWxrKG5vZGUub2JqZWN0LCBjYilcbiAgfVxuICBpZiAobm9kZS50eXBlID09PSAnTWVtYmVyRXhwcmVzc2lvbicpIHtcbiAgICB3YWxrKChub2RlIGFzIE1lbWJlckV4cHJlc3Npb24pLnByb3BlcnR5LCBjYilcbiAgfVxuICBpZiAobm9kZS50eXBlID09PSAnVGVtcGxhdGVMaXRlcmFsJyAmJiAnZXhwcmVzc2lvbnMnIGluIG5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IGV4cHJlc3Npb24gb2YgKG5vZGUgYXMgVGVtcGxhdGVMaXRlcmFsKS5leHByZXNzaW9ucykge1xuICAgICAgd2FsayhleHByZXNzaW9uLCBjYilcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3RyaW5naWZ5VmFsdWUgPSAodmFsdWU6IHVua25vd24pID0+IHtcbiAgLy8gaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgLy8gICByZXR1cm4gJ3VuZGVmaW5lZCdcbiAgLy8gfVxuXG4gIGNvbnN0IHN0ciA9ICBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblxuICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ1wiJykgJiYgc3RyLmVuZHNXaXRoKCdcIicpKSB7XG4gICAgcmV0dXJuIGAnJHtzdHIuc2xpY2UoMSwgLTEpfSdgXG4gIH1cblxuICByZXR1cm5cbn1cblxuY29uc3Qgb25BY2Nlc3MgPSAobm9kZTogYW55LCBjb2RlU3RyaW5nOiBNYWdpY1N0cmluZywgY2I6IChub2RlOiBhbnkpID0+IHZvaWQpID0+IHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ1Byb3BlcnR5QWNjZXNzRXhwcmVzc2lvbicpIHtcbiAgICByZXR1cm4gY2Iobm9kZSlcbiAgfVxuICBpZiAobm9kZS50eXBlID09PSAnSWRlbnRpZmllcicpIHtcbiAgICByZXR1cm4gY2Iobm9kZSlcbiAgfVxuXG4gIGlmIChub2RlLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbicpIHtcbiAgICBub2RlLmFyZ3VtZW50cy5mb3JFYWNoKChhcmc6IGFueSkgPT4ge1xuICAgICAgb25BY2Nlc3MoYXJnLCBjb2RlU3RyaW5nLCBjYilcbiAgICB9KVxuICAgIHJldHVybiBvbkFjY2Vzcyhub2RlLmNhbGxlZSwgY29kZVN0cmluZywgY2IpXG4gIH1cblxuICBpZiAoJ2NoaWxkcmVuJyBpbiBub2RlKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBvbkFjY2VzcyhjaGlsZCwgY29kZVN0cmluZywgY2IpXG4gICAgfVxuICB9XG5cbiAgaWYgKCdleHByZXNzaW9ucycgaW4gbm9kZSkge1xuICAgIGZvciAoY29uc3QgZXhwcmVzc2lvbiBvZiBub2RlLmV4cHJlc3Npb25zKSB7XG4gICAgICBvbkFjY2VzcyhleHByZXNzaW9uLCBjb2RlU3RyaW5nLCBjYilcbiAgICB9XG4gIH1cblxuICBpZiAoJ2V4cHJlc3Npb24nIGluIG5vZGUpIHtcbiAgICBvbkFjY2Vzcyhub2RlLmV4cHJlc3Npb24sIGNvZGVTdHJpbmcsIGNiKVxuICB9XG5cbiAgaWYgKCdsZWZ0JyBpbiBub2RlKSB7XG4gICAgb25BY2Nlc3Mobm9kZS5sZWZ0LCBjb2RlU3RyaW5nLCBjYilcbiAgfVxuXG4gIGlmICgncmlnaHQnIGluIG5vZGUpIHtcbiAgICBvbkFjY2Vzcyhub2RlLnJpZ2h0LCBjb2RlU3RyaW5nLCBjYilcbiAgfVxuXG4gIGlmICgnb2JqZWN0JyBpbiBub2RlKSB7XG4gICAgb25BY2Nlc3Mobm9kZS5vYmplY3QsIGNvZGVTdHJpbmcsIGNiKVxuICB9XG5cbiAgaWYgKCdlbGVtZW50cycgaW4gbm9kZSkge1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBub2RlLmVsZW1lbnRzKSB7XG4gICAgICBvbkFjY2VzcyhlbGVtZW50LCBjb2RlU3RyaW5nLCBjYilcbiAgICB9XG4gIH1cbn1cblxuLyoqIEFkZCBfY3R4IHRvIElkZW50aWZpZXIgaWYgaXQgaXMgbm90IGluIHByb3BlcnR5IGFjY2VzcyAqL1xuY29uc3QgYWRkX2N0eCA9IChub2RlOiBhbnksIGNvZGVTdHJpbmc6IE1hZ2ljU3RyaW5nLCBpZ25vcmU6IHN0cmluZ1tdKSA9PiB7XG4gIG9uQWNjZXNzKG5vZGUsIGNvZGVTdHJpbmcsIChub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0lkZW50aWZpZXInICYmIGlnbm9yZS5pbmNsdWRlcyhub2RlLm5hbWUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uJyAmJiBub2RlLm9iamVjdC50eXBlID09PSAnSWRlbnRpZmllcicgJiYgaWdub3JlLmluY2x1ZGVzKG5vZGUub2JqZWN0Lm5hbWUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb2RlU3RyaW5nLmFwcGVuZExlZnQobm9kZS5zdGFydCwgJ19jdHguJylcbiAgfSlcbn1cblxuLyoqIEFkZCBfY3R4IHRvIGFsbCB2YXJpYWJsZXMgdXNlZCAqL1xuZXhwb3J0IGNvbnN0IGFkZENvbnRleHQgPSAoY29kZTogc3RyaW5nLCBpZ25vcmU6IHN0cmluZ1tdID0gW10pID0+IHtcbiAgY29uc3QgY29kZVN0cmluZyA9IG5ldyBNYWdpY1N0cmluZyhjb2RlKVxuICBjb25zdCBhc3QgPSBwYXJzZShjb2RlLCB7IGVjbWFWZXJzaW9uOiAyMDIwIH0pXG5cbiAgYWRkX2N0eChhc3QuYm9keVswXSwgY29kZVN0cmluZywgaWdub3JlKVxuXG4gIHJldHVybiBjb2RlU3RyaW5nLnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IGNvbnN0IHNpbXBsaWZ5Q29kZSA9IChjb2RlOiBzdHJpbmcsIGN0eDogQ29tcGlsZXJDb250ZXh0KSA9PiB7XG4gIGNvbnN0IGNvZGVTdHJpbmcgPSBuZXcgTWFnaWNTdHJpbmcoY29kZSlcbiAgY29uc3QgYXN0ID0gcGFyc2UoY29kZSwgeyBlY21hVmVyc2lvbjogMjAyMCB9KVxuXG4gIG9uQWNjZXNzKGFzdC5ib2R5WzBdLCBjb2RlU3RyaW5nLCAobm9kZSkgPT4ge1xuICAgIGlmIChjdHguY29tcG9uZW50LnNjcmlwdC5zY3JpcHRTZXR1cENvbnRlbnQuZnVuY3Rpb25OYW1lcy5pbmNsdWRlcyhub2RlLm5hbWUpKSB7XG4gICAgICBjdHguaW1wb3J0cy5wdXNoKG5vZGUubmFtZSlcbiAgICB9XG5cbiAgICBpZiAoISgnbmFtZScgaW4gbm9kZSkgfHwgdHlwZW9mIG5vZGUubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIHBhcnNlIGV4cHJlc3Npb24nLCBjb2RlLCAnSW52YWxpZCBub2RlJywgbm9kZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChub2RlLm5hbWUgPT09ICckcHJvcHMnKSB7XG4gICAgICBjb2RlU3RyaW5nLm92ZXJ3cml0ZShub2RlLnN0YXJ0LCBub2RlLmVuZCArIDEsICcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZHluYW1pY1Byb3AgPSBjdHguZHluYW1pY1Byb3BzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gbm9kZS5uYW1lKVxuXG4gICAgaWYgKGR5bmFtaWNQcm9wKSB7XG4gICAgICBjb2RlU3RyaW5nLm92ZXJ3cml0ZShub2RlLnN0YXJ0LCBub2RlLmVuZCwgZHluYW1pY1Byb3AudmFsdWUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzdGF0aWNQcm9wID0gY3R4LnByb3BzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gbm9kZS5uYW1lKVxuICAgIGlmIChzdGF0aWNQcm9wKSB7XG4gICAgICAvLyBEbyBub3QgcmVuZGVyIHF1b3RlcyBhcm91bmQgaW4gJHt9IGluIHRlbXBsYXRlIGxpdGVyYWxzXG4gICAgICBpZiAoY29kZVN0cmluZy5vcmlnaW5hbFtub2RlLnN0YXJ0IC0gMl0gPT09ICckJyAmJiBjb2RlU3RyaW5nLm9yaWdpbmFsW25vZGUuc3RhcnQgLSAxXSA9PT0gJ3snICYmIGNvZGVTdHJpbmcub3JpZ2luYWxbbm9kZS5lbmRdID09PSAnfScpIHtcbiAgICAgICAgY29kZVN0cmluZy5vdmVyd3JpdGUobm9kZS5zdGFydCAtIDIsIG5vZGUuZW5kICsgMSwgc3RhdGljUHJvcC52YWx1ZSEpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IHN0cmluZ2lmeVZhbHVlKHN0YXRpY1Byb3AudmFsdWUpXG5cbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgLy8gVE9ETzogTWF5YmUgcHJvcCBpcyByZXF1aXJlZFxuICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBmaW5kIHByb3AgdmFsdWUnLCBzdGF0aWNQcm9wLCB2YWx1ZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvZGVTdHJpbmcub3ZlcndyaXRlKG5vZGUuc3RhcnQsIG5vZGUuZW5kLCB2YWx1ZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gY29kZVN0cmluZy50b1N0cmluZygpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvZXhlY3V0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlL3ByaW50LXJlbmRlcmluZy1jb250ZXh0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvZXhlY3V0ZS9wcmludC1yZW5kZXJpbmctY29udGV4dC50c1wiO2ltcG9ydCB7IENvbXBpbGVyQ29udGV4dCB9IGZyb20gJy4uL2NyZWF0ZS1jb21waWxlci1jb250ZXh0J1xuaW1wb3J0IHsgVmlydHVhbENvbXBvbmVudCB9IGZyb20gJy4uL2NyZWF0ZS12aXJ0dWFsLWNvbXBvbmVudCdcbmltcG9ydCB7IGV4ZWN1dGUsIHNpbXBsaWZ5Q29kZSwgYWRkQ29udGV4dCB9IGZyb20gJy4vZXhlY3V0ZSdcblxudHlwZSBTY29wZSA9IHtcbiAgc3RhdGljPzogUmVjb3JkPHN0cmluZywgYW55PixcbiAgZHluYW1pYz86IFJlY29yZDxzdHJpbmcsIGFueT5cbn1cblxuLyoqIEV4ZWN1dGUgY29kZSBkdXJpbmcgY29tcGlsYXRpb24gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVJblRlbXBsYXRlRXhlY3V0ZXIgPSA8VCA9IGFueT4oY3R4OiB7XG4gIHByb3BzOiB7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCB9W10sXG4gIGR5bmFtaWNQcm9wczogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdLFxuICBzbG90czogUmVjb3JkPHN0cmluZywgYW55PixcbiAgaW1wb3J0czogc3RyaW5nW10sXG4gIGNvbXBvbmVudDogVmlydHVhbENvbXBvbmVudFxufSkgPT4ge1xuICAvLyBJZiBkeW5hbWljIHByb3BzIGFyZSB1c2VkLCB3ZSBuZWVkIHRvIHJldHVybiB0aGUgY29kZSBpbnN0ZWFkIG9mIHRoZSB2YWx1ZVxuICBsZXQgaXNEeW5hbWljID0gZmFsc2VcbiAgY29uc3QgX2N0eE9iaiA9IG5ldyBQcm94eSh7fSBhcyBhbnksIHtcbiAgICBnZXQodGFyZ2V0LCBrZXk6IHN0cmluZykge1xuICAgICAgY29uc3QgZHluYW1pY1Byb3AgPSBjdHguZHluYW1pY1Byb3BzLmZpbmQoKHByb3ApID0+IHByb3AubmFtZSA9PT0ga2V5KVxuXG4gICAgICBpZiAoZHluYW1pY1Byb3ApIHtcbiAgICAgICAgaXNEeW5hbWljID0gdHJ1ZVxuICAgICAgICByZXR1cm4gYCR7ZHluYW1pY1Byb3AudmFsdWV9YFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGF0aWNQcm9wID0gY3R4LnByb3BzLmZpbmQoKHByb3ApID0+IHByb3AubmFtZSA9PT0ga2V5KVxuXG4gICAgICBpZiAoc3RhdGljUHJvcCkge1xuICAgICAgICByZXR1cm4gc3RhdGljUHJvcC52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoa2V5IGluIGN0eC5zbG90cykge1xuICAgICAgICByZXR1cm4gJyRzbG90cy4nICsga2V5XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICckcHJvcHMnKSB7XG4gICAgICAgIHJldHVybiBfY3R4T2JqXG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICckc2xvdHMnKSB7XG4gICAgICAgIHJldHVybiBjdHguc2xvdHNcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgbGV0IHNjb3BlU3RhY2sgPSBbXSBhcyBTY29wZVtdXG5cbiAgY29uc3QgY29kZVJ1bm5lciA9IChjb2RlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzY29wZSA9IHNjb3BlU3RhY2sucmVkdWNlKChhY2MsIHNjb3BlKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0aWM6IHsgLi4uYWNjLnN0YXRpYywgLi4uc2NvcGUuc3RhdGljIH0sXG4gICAgICAgIGR5bmFtaWM6IHsgLi4uYWNjLmR5bmFtaWMsIC4uLnNjb3BlLmR5bmFtaWMgfVxuICAgICAgfVxuICAgIH0sIHt9KVxuXG4gICAgY29uc3QgZm5Db2RlID0gYCgoX2N0eCkgPT4ge1xuICAgICAgJHtjdHguY29tcG9uZW50LnNjcmlwdC5zY3JpcHRTZXR1cENvbnRlbnQuZnVuY3Rpb25zLmpvaW4oJ1xcbicpfVxuICAgICAgcmV0dXJuICgoKSA9PiAke2FkZENvbnRleHQoY29kZSwgY3R4LmNvbXBvbmVudC5zY3JpcHQuc2NyaXB0U2V0dXBDb250ZW50LmZ1bmN0aW9uTmFtZXMpfSkoKVxuICAgIH0pXG4gICAgYFxuXG4gICAgY29uc3QgbmV3Q3R4ID0gbmV3IFByb3h5KF9jdHhPYmosIHtcbiAgICAgIGdldCh0YXJnZXQsIGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChzY29wZS5keW5hbWljICYmIGtleSBpbiBzY29wZS5keW5hbWljKSB7XG4gICAgICAgICAgaXNEeW5hbWljID0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBzY29wZS5keW5hbWljW2tleV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29wZS5zdGF0aWMgJiYga2V5IGluIHNjb3BlLnN0YXRpYykge1xuICAgICAgICAgIHJldHVybiBzY29wZS5zdGF0aWNba2V5XVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9jdHhPYmpba2V5XVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpc0R5bmFtaWMgPSBmYWxzZVxuXG4gICAgY29uc3QgZm4gPSBleGVjdXRlKGZuQ29kZSkgYXMgKF9jdHg6IGFueSkgPT4gVFxuICAgIGxldCB2YWx1ZVxuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IGZuKG5ld0N0eCkgYXMgVFxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNEeW5hbWljKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogc2ltcGxpZnlDb2RlKGNvZGUsIGN0eCBhcyBDb21waWxlckNvbnRleHQpLFxuICAgICAgICBpc0R5bmFtaWM6IHRydWUgYXMgY29uc3RcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWUsXG4gICAgICBpc0R5bmFtaWM6IGZhbHNlIGFzIGNvbnN0XG4gICAgfVxuICB9XG5cbiAgY29kZVJ1bm5lci5hZGRTY29wZSA9IChzY29wZTogU2NvcGUpID0+IHtcbiAgICBzY29wZVN0YWNrLnB1c2goc2NvcGUpXG4gIH1cblxuICBjb2RlUnVubmVyLnJlbW92ZVNjb3BlID0gKHNjb3BlOiBTY29wZSkgPT4ge1xuICAgIHNjb3BlU3RhY2sgPSBzY29wZVN0YWNrLmZpbHRlcigocykgPT4gcyAhPT0gc2NvcGUpXG4gIH1cblxuICBjb2RlUnVubmVyLnRyeUdldFZhbHVlID0gKGNvZGU6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZXhlY3V0ZShgKCgpID0+ICR7Y29kZX0pKClgKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvZGVSdW5uZXJcbn1cblxuZXhwb3J0IGNvbnN0IHByaW50VmFsdWVJblRlbXBsYXRlID0gPFQ+KHJlc3VsdDogeyB2YWx1ZTogVCwgaXNEeW5hbWljOiBib29sZWFuIH0sIHR5cGU6ICdJbnRlcnBvbGF0aW9uJyB8ICdCaW5kJykgPT4ge1xuICBpZiAocmVzdWx0LmlzRHluYW1pYykge1xuICAgIGlmICh0eXBlID09PSAnQmluZCcpIHtcbiAgICAgIHJldHVybiBTdHJpbmcocmVzdWx0LnZhbHVlKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0ludGVycG9sYXRpb24nKSB7XG4gICAgICByZXR1cm4gYHt7ICR7cmVzdWx0LnZhbHVlfSB9fWBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IHByaW50IHZhbHVlIGluIHRlbXBsYXRlLiBJbnZhbGlkIHR5cGUgJHt0eXBlfWApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhyZXN1bHQudmFsdWUpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL2FzdC1oZWxwZXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9hc3QtaGVscGVycy50c1wiO2ltcG9ydCB7IEF0dHJpYnV0ZU5vZGUsIENvbXBvbmVudE5vZGUsIERpcmVjdGl2ZU5vZGUsIEVsZW1lbnROb2RlLCBFbGVtZW50VHlwZXMsIEludGVycG9sYXRpb25Ob2RlLCBOb2RlVHlwZXMsIFJvb3ROb2RlLCBTbG90T3V0bGV0Tm9kZSwgVGVtcGxhdGVDaGlsZE5vZGUsIFRlbXBsYXRlTm9kZSwgTm9kZSB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIlxuXG5leHBvcnQgY29uc3QgaXNQcm9wQXR0cmlidXRlID0gKHByb3A6IGFueSk6IHByb3AgaXMgQXR0cmlidXRlTm9kZSA9PiB7XG4gIHJldHVybiBwcm9wLnR5cGUgPT09IE5vZGVUeXBlcy5BVFRSSUJVVEVcbn1cblxuZXhwb3J0IGNvbnN0IGlzUHJvcERpcmVjdGl2ZSA9IChwcm9wOiBhbnkpOiBwcm9wIGlzIERpcmVjdGl2ZU5vZGUgPT4ge1xuICByZXR1cm4gcHJvcC50eXBlID09PSBOb2RlVHlwZXMuRElSRUNUSVZFXG59XG5cbmV4cG9ydCBjb25zdCBpc05vZGVTbG90ID0gKG5vZGU6IFRlbXBsYXRlQ2hpbGROb2RlKTogbm9kZSBpcyBTbG90T3V0bGV0Tm9kZSA9PiB7XG4gIHJldHVybiBub2RlLnR5cGUgPT09IE5vZGVUeXBlcy5FTEVNRU5UICYmIG5vZGUudGFnVHlwZSA9PT0gRWxlbWVudFR5cGVzLlNMT1Rcbn1cblxuLyoqIElmIHNsb3QgcGFzc2VkIGFzIHRlbXBsYXRlICovXG5leHBvcnQgY29uc3QgaXNOb2RlVGVtcGxhdGVTbG90ID0gKG5vZGU6IFRlbXBsYXRlQ2hpbGROb2RlKTogbm9kZSBpcyBUZW1wbGF0ZU5vZGUgPT4ge1xuICAvLyBUT0RPOiBDaGVjayBpZiB0ZW1wbGF0ZSBoYXZlIHNsb3QgYXR0cmlidXRlXG4gIHJldHVybiBub2RlLnR5cGUgPT09IE5vZGVUeXBlcy5FTEVNRU5UICYmIG5vZGUudGFnVHlwZSA9PT0gRWxlbWVudFR5cGVzLlRFTVBMQVRFXG59XG5cbmV4cG9ydCBjb25zdCBpc05vZGVFbGVtZW50ID0gKG5vZGU6IFRlbXBsYXRlQ2hpbGROb2RlIHwgUm9vdE5vZGUpOiBub2RlIGlzIEVsZW1lbnROb2RlID0+IHtcbiAgcmV0dXJuIG5vZGUudHlwZSA9PT0gTm9kZVR5cGVzLkVMRU1FTlRcbn1cblxuZXhwb3J0IGNvbnN0IGlzTm9kZUhhc0NoaWxkcmVuID0gKG5vZGU6IFRlbXBsYXRlQ2hpbGROb2RlIHwgUm9vdE5vZGUpOiBub2RlIGlzIEVsZW1lbnROb2RlIHwgUm9vdE5vZGUgPT4ge1xuICByZXR1cm4gJ2NoaWxkcmVuJyBpbiBub2RlXG59XG5cbmV4cG9ydCBjb25zdCBpc05vZGVDb21wb25lbnQgPSAobm9kZTogVGVtcGxhdGVDaGlsZE5vZGUpOiBub2RlIGlzIENvbXBvbmVudE5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSBOb2RlVHlwZXMuRUxFTUVOVCAmJiBub2RlLnRhZ1R5cGUgPT09IEVsZW1lbnRUeXBlcy5DT01QT05FTlRcbn1cblxuZXhwb3J0IGNvbnN0IGlzTm9kZUludGVycG9sYXRpb24gPSAobm9kZTogVGVtcGxhdGVDaGlsZE5vZGUpOiBub2RlIGlzIEludGVycG9sYXRpb25Ob2RlID0+IHtcbiAgcmV0dXJuIG5vZGUudHlwZSA9PT0gTm9kZVR5cGVzLklOVEVSUE9MQVRJT05cbn1cblxuZXhwb3J0IGNvbnN0IGlzTm9kZVdpdGhJZiA9IChub2RlOiBUZW1wbGF0ZUNoaWxkTm9kZSk6IG5vZGUgaXMgRWxlbWVudE5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSBOb2RlVHlwZXMuRUxFTUVOVCAmJiBub2RlLnByb3BzLnNvbWUoKHByb3ApID0+IHByb3AubmFtZSA9PT0gJ3YtaWYnKVxufVxuXG5leHBvcnQgY29uc3QgaXNOb2RlV2l0aEZvciA9IChub2RlOiBUZW1wbGF0ZUNoaWxkTm9kZSk6IG5vZGUgaXMgRWxlbWVudE5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSBOb2RlVHlwZXMuRUxFTUVOVCAmJiBub2RlLnByb3BzLnNvbWUoKHByb3ApID0+IHByb3AubmFtZSA9PT0gJ3YtZm9yJylcbn1cblxuZXhwb3J0IGNvbnN0IHBhdGNoTm9kZSA9IDxUIGV4dGVuZHMgTm9kZT4obm9kZTogTm9kZSwgbmV3Tm9kZTogVCkgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobm9kZSkgYXMgKGtleW9mIE5vZGUpW11cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGRlbGV0ZSBub2RlW2tleV1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24obm9kZSwgbmV3Tm9kZSlcblxuICByZXR1cm4gbm9kZVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1zbG90LW5vZGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tc2xvdC1ub2RlLnRzXCI7aW1wb3J0IHsgVGVtcGxhdGVOb2RlLCBFbGVtZW50Tm9kZSB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIlxuaW1wb3J0IHsgQ29tcGlsZXJDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2NyZWF0ZS1jb21waWxlci1jb250ZXh0XCJcbmltcG9ydCB7IGlzUHJvcEF0dHJpYnV0ZSB9IGZyb20gXCIuLi9hc3QtaGVscGVyc1wiXG5cbmZ1bmN0aW9uIGdldE5vZGVTbG90TmFtZShub2RlOiBFbGVtZW50Tm9kZSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG5hbWVQcm9wID0gbm9kZS5wcm9wcy5maW5kKChwcm9wKSA9PiBwcm9wLm5hbWUgPT09ICduYW1lJylcblxuICBpZiAobmFtZVByb3AgJiYgaXNQcm9wQXR0cmlidXRlKG5hbWVQcm9wKSkge1xuICAgIHJldHVybiBuYW1lUHJvcC52YWx1ZT8uY29udGVudFxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU2xvdE5vZGUgPSAobm9kZTogRWxlbWVudE5vZGUsIHBhcmVudDogRWxlbWVudE5vZGUsIGN0eDogQ29tcGlsZXJDb250ZXh0KSA9PiB7XG4gIGNvbnN0IG5vZGVJbmRleCA9IHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpXG5cbiAgY29uc3Qgc2xvdE5hbWUgPSBnZXROb2RlU2xvdE5hbWUobm9kZSkgfHwgJ2RlZmF1bHQnXG4gIGNvbnN0IHNsb3QgPSBjdHguc2xvdHNbc2xvdE5hbWVdXG5cbiAgaWYgKCFzbG90KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZShub2RlSW5kZXgsIDEpXG4gICAgcmV0dXJuXG4gIH1cblxuICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKG5vZGVJbmRleCwgMSwgLi4uc2xvdC5jaGlsZHJlbilcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tcHJvcC1iaW5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtLXByb3AtYmluZC50c1wiO2ltcG9ydCB7IEF0dHJpYnV0ZU5vZGUsIERpcmVjdGl2ZU5vZGUsIEVsZW1lbnROb2RlLCBOb2RlVHlwZXMsIFJvb3ROb2RlLCBUZXh0Tm9kZSwgTm9kZSB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIjtcbmltcG9ydCB7IENvbXBpbGVyQ29udGV4dCB9IGZyb20gXCIuLi8uLi9jcmVhdGUtY29tcGlsZXItY29udGV4dFwiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2xhc3MsIG5vcm1hbGl6ZVN0eWxlIH0gZnJvbSBcIkB2dWUvc2hhcmVkXCI7XG5pbXBvcnQgeyBwcmludFZhbHVlSW5UZW1wbGF0ZSB9IGZyb20gXCIuLi8uLi9leGVjdXRlL3ByaW50LXJlbmRlcmluZy1jb250ZXh0XCI7XG5pbXBvcnQgeyBpc05vZGVFbGVtZW50LCBpc1Byb3BBdHRyaWJ1dGUsIGlzUHJvcERpcmVjdGl2ZSwgcGF0Y2hOb2RlIH0gZnJvbSBcIi4uL2FzdC1oZWxwZXJzXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1Bc3RXaXRoQ29udGV4dCB9IGZyb20gXCIuLi90cmFuc2Zvcm0tbm9kZVwiO1xuXG5jb25zdCB0cmFuc2Zvcm1CaW5kRGlyZWN0aXZlID0gKHByb3A6IERpcmVjdGl2ZU5vZGUsIGN0eDogQ29tcGlsZXJDb250ZXh0KSA9PiB7XG4gIGlmIChwcm9wLmV4cD8udHlwZSAhPT0gTm9kZVR5cGVzLlNJTVBMRV9FWFBSRVNTSU9OKSB7XG4gICAgY29uc29sZS53YXJuKCdPbmx5IHNpbXBsZSBleHByZXNzaW9ucyBhcmUgc3VwcG9ydGVkIGluIHByb3AgYmluZHMnKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCFwcm9wLmFyZyB8fCBwcm9wLmFyZy50eXBlICE9PSBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYmluZCBkaXJlY3RpdmU6IHYtYmluZCBkaXJlY3RpdmUgaXMgbm90IHN1cHBvcnRlZCB5ZXQuIFVzZSA6cHJvcCBpbnN0ZWFkJylcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGN0eC5leGVjdXRlKHByb3AuZXhwLmNvbnRlbnQpXG5cbiAgaWYgKHByb3AuYXJnLmNvbnRlbnQgPT09ICdjbGFzcycpIHtcbiAgICByZXN1bHQudmFsdWUgPSBub3JtYWxpemVDbGFzcyhyZXN1bHQudmFsdWUpXG4gIH0gZWxzZSBpZiAocHJvcC5hcmcuY29udGVudCA9PT0gJ3N0eWxlJykge1xuICAgIHJlc3VsdC52YWx1ZSA9IG5vcm1hbGl6ZVN0eWxlKHJlc3VsdC52YWx1ZSlcbiAgfVxuXG4gIGlmIChyZXN1bHQuaXNEeW5hbWljKSB7XG4gICAgcHJvcC5leHAuY29udGVudCA9IHByaW50VmFsdWVJblRlbXBsYXRlKHJlc3VsdCwgJ0JpbmQnKVxuICB9IGVsc2Uge1xuICAgIHBhdGNoTm9kZTxBdHRyaWJ1dGVOb2RlPihwcm9wLCB7XG4gICAgICB0eXBlOiBOb2RlVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbG9jOiBwcm9wLmxvYyxcbiAgICAgIG5hbWU6IHByb3AuYXJnLmNvbnRlbnQsXG4gICAgICBuYW1lTG9jOiBwcm9wLmFyZy5sb2MsXG4gICAgICB2YWx1ZToge1xuICAgICAgICB0eXBlOiBOb2RlVHlwZXMuVEVYVCxcbiAgICAgICAgY29udGVudDogcmVzdWx0LnZhbHVlLFxuICAgICAgICBsb2M6IHByb3AuZXhwLmxvY1xuICAgICAgfSBzYXRpc2ZpZXMgVGV4dE5vZGUsXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCB0cmFuc2Zvcm1JZkRpcmVjdGl2ZSA9IChwcm9wOiBEaXJlY3RpdmVOb2RlLCBub2RlOiBFbGVtZW50Tm9kZSwgcGFyZW50OiBFbGVtZW50Tm9kZSB8IFJvb3ROb2RlLCBjdHg6IENvbXBpbGVyQ29udGV4dCkgPT4ge1xuICBpZiAocHJvcC5leHA/LnR5cGUgIT09IE5vZGVUeXBlcy5TSU1QTEVfRVhQUkVTU0lPTikge1xuICAgIGNvbnNvbGUud2FybignT25seSBzaW1wbGUgZXhwcmVzc2lvbnMgYXJlIHN1cHBvcnRlZCBpbiB2LWlmJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGN0eC5leGVjdXRlKHByb3AuZXhwLmNvbnRlbnQpXG5cbiAgaWYgKHJlc3VsdC52YWx1ZSkge1xuICAgIGlmICghcmVzdWx0LmlzRHluYW1pYykge1xuICAgICAgbm9kZS5wcm9wcyA9IG5vZGUucHJvcHMuZmlsdGVyKChwKSA9PiBwcm9wICE9PSBwKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wLmV4cC5jb250ZW50ID0gcHJpbnRWYWx1ZUluVGVtcGxhdGUocmVzdWx0LCAnQmluZCcpXG4gICAgfVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBwYXJlbnQuY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgIT09IG5vZGUpXG59XG5cbmNvbnN0IHRyYW5zZm9ybUZvckRpcmVjdGl2ZSA9IChwcm9wOiBEaXJlY3RpdmVOb2RlLCBub2RlOiBFbGVtZW50Tm9kZSwgcGFyZW50OiBFbGVtZW50Tm9kZSB8IFJvb3ROb2RlLCBjdHg6IENvbXBpbGVyQ29udGV4dCkgPT4ge1xuICBjb25zdCBhcnJheVN0ciA9IHByb3AuZm9yUGFyc2VSZXN1bHQ/LnNvdXJjZS5sb2Muc291cmNlXG4gIGNvbnN0IGFyZ3NTdHIgPSBwcm9wLmZvclBhcnNlUmVzdWx0Py52YWx1ZT8ubG9jLnNvdXJjZVxuXG4gIGlmICghYXJyYXlTdHIgfHwgIWFyZ3NTdHIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdi1mb3IgZGlyZWN0aXZlOiBVbmFibGUgdG8gcGFyc2Ugdi1mb3InKVxuICB9XG5cbiAgY29uc3QgcHJvdmlkZWRQcm9wID0gY3R4LmR5bmFtaWNQcm9wcy5maW5kKChwcm9wKSA9PiBwcm9wLm5hbWUgPT09IGFycmF5U3RyKVxuXG4gIGlmICghcHJvdmlkZWRQcm9wKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHYtZm9yIGRpcmVjdGl2ZTogTm8gcHJvcCBwYXNzZWQsIGlkayB3aGF0IHRvIGRvJylcbiAgfVxuXG4gIGNvbnN0IGV4ZWN1dGlvblJlc3VsdCA9IGN0eC5leGVjdXRlKHByb3ZpZGVkUHJvcC52YWx1ZSlcblxuICBsZXQgYXJyYXkgPSBleGVjdXRpb25SZXN1bHQudmFsdWVcbiAgaWYgKGV4ZWN1dGlvblJlc3VsdC5pc0R5bmFtaWMpIHtcbiAgICBhcnJheSA9IGN0eC5leGVjdXRlLnRyeUdldFZhbHVlKGV4ZWN1dGlvblJlc3VsdC52YWx1ZSlcbiAgfVxuXG4gIGlmIChhcnJheSAmJiBBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgIG5vZGUucHJvcHMgPSBub2RlLnByb3BzLmZpbHRlcigocCkgPT4gcCAhPT0gcHJvcClcbiAgICBub2RlLnByb3BzID0gbm9kZS5wcm9wcy5maWx0ZXIoKHApID0+IGlzUHJvcERpcmVjdGl2ZShwKSAmJiBwLm5hbWUgPT09ICdiaW5kJyAmJiAnY29udGVudCcgaW4gcC5hcmchICYmIHAuYXJnPy5jb250ZW50ICE9PSAna2V5JylcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gYXJyYXkubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBjbG9uZWROb2RlID0gc3RydWN0dXJlZENsb25lKG5vZGUpXG5cbiAgICAgIGNvbnN0IHNjb3BlID0geyBzdGF0aWM6IHsgaXRlbSB9IH1cblxuICAgICAgY3R4LmV4ZWN1dGUuYWRkU2NvcGUoc2NvcGUpXG5cbiAgICAgIGNvbnN0IG5ld05vZGUgPSB0cmFuc2Zvcm1Bc3RXaXRoQ29udGV4dChjbG9uZWROb2RlLCBjdHgpXG5cbiAgICAgIGN0eC5leGVjdXRlLnJlbW92ZVNjb3BlKHNjb3BlKVxuXG4gICAgICByZXR1cm4gbmV3Tm9kZVxuICAgIH0pXG5cbiAgICBwYXJlbnQuY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkID09PSBub2RlKSB7XG4gICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9KS5mbGF0KClcblxuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGtleSA9IG5vZGUucHJvcHMuZmluZCgocCkgPT4gaXNQcm9wRGlyZWN0aXZlKHApICYmIHAubmFtZSA9PT0gJ2JpbmQnICYmICdjb250ZW50JyBpbiBwLmFyZyEgJiYgcC5hcmc/LmNvbnRlbnQgPT09ICdrZXknKVxuXG4gICAgbm9kZS5wcm9wcyA9IG5vZGUucHJvcHMuZmlsdGVyKChwKSA9PiBwICE9PSBrZXkpXG5cbiAgICBjb25zdCBzY29wZSA9IHsgZHluYW1pYzogeyBpdGVtOiAnaXRlbSd9fVxuXG4gICAgcGFyZW50LmNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IHtcbiAgICAgIGlmICghaXNOb2RlRWxlbWVudChjaGlsZCkpIHsgcmV0dXJuIGNoaWxkIH1cblxuICAgICAgY3R4LmV4ZWN1dGUuYWRkU2NvcGUoc2NvcGUpXG5cbiAgICAgIGNvbnN0IG5ld05vZGUgPSB0cmFuc2Zvcm1Bc3RXaXRoQ29udGV4dChjaGlsZCwgY3R4KVxuXG4gICAgICBjdHguZXhlY3V0ZS5yZW1vdmVTY29wZShzY29wZSlcblxuICAgICAgcmV0dXJuIG5ld05vZGVcbiAgICB9KVxuXG4gICAgaWYgKGtleSkgbm9kZS5wcm9wcy5wdXNoKHsuLi5rZXl9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Qcm9wQmluZCA9IChwcm9wOiBEaXJlY3RpdmVOb2RlLCBub2RlOiBFbGVtZW50Tm9kZSwgcGFyZW50OiBFbGVtZW50Tm9kZSB8IFJvb3ROb2RlLCBjdHg6IENvbXBpbGVyQ29udGV4dCkgPT4ge1xuICBpZiAoIXByb3ApIHsgcmV0dXJuIH1cblxuICBpZiAocHJvcC5uYW1lID09PSAnYmluZCcpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtQmluZERpcmVjdGl2ZShwcm9wLCBjdHgpXG4gIH0gZWxzZSBpZiAocHJvcC5uYW1lID09PSAnaWYnKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybUlmRGlyZWN0aXZlKHByb3AsIG5vZGUsIHBhcmVudCwgY3R4KVxuICB9IGVsc2UgaWYgKHByb3AubmFtZSA9PT0gJ2ZvcicpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtRm9yRGlyZWN0aXZlKHByb3AsIG5vZGUsIHBhcmVudCwgY3R4KVxuICB9IGVsc2UgaWYgKHByb3AubmFtZSA9PT0gJ3Nsb3QnKSB7XG4gICAgLy8gcGFzc1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc29sZS53YXJuKCdVbmtub3duIGRpcmVjdGl2ZScsIHByb3AubmFtZSlcbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGJpbmQgZGlyZWN0aXZlJylcbn1cblxuZXhwb3J0IGNvbnN0IG1lcmdlRHVwbGljYXRlID0gKHByb3BzOiAoRGlyZWN0aXZlTm9kZSB8IEF0dHJpYnV0ZU5vZGUpW10pID0+IHtcbiAgY29uc3QgbmV3UHJvcHMgPSBbXSBhcyAoRGlyZWN0aXZlTm9kZSB8IEF0dHJpYnV0ZU5vZGUpW11cblxuICBwcm9wcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgaWYgKCFuZXdQcm9wcy5maW5kKChwKSA9PiBwLm5hbWUgPT09IHByb3AubmFtZSkpIHtcbiAgICAgIG5ld1Byb3BzLnB1c2gocHJvcClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHJvcEF0dHJpYnV0ZShwcm9wKSAmJiAocHJvcC5uYW1lID09PSAnY2xhc3MnIHx8IHByb3AubmFtZSA9PT0gJ3N0eWxlJykpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdQcm9wID0gbmV3UHJvcHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBwcm9wLm5hbWUpIGFzIEF0dHJpYnV0ZU5vZGVcbiAgICAgICAgY29uc3QgZXhpc3RpbmdWYWx1ZSA9IGV4aXN0aW5nUHJvcC52YWx1ZT8uY29udGVudFxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHByb3AudmFsdWU/LmNvbnRlbnRcblxuICAgICAgICBpZiAocHJvcC5uYW1lID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgZXhpc3RpbmdQcm9wLnZhbHVlIS5jb250ZW50ID0gbm9ybWFsaXplQ2xhc3MoYCR7ZXhpc3RpbmdWYWx1ZX0gJHtuZXdWYWx1ZX1gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXN0aW5nUHJvcC52YWx1ZSEuY29udGVudCA9IFN0cmluZyhub3JtYWxpemVTdHlsZShgJHtleGlzdGluZ1ZhbHVlfTsgJHtuZXdWYWx1ZX1gKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gbmV3UHJvcHNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0taW50ZXJwb2xhdGlvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1pbnRlcnBvbGF0aW9uLnRzXCI7aW1wb3J0IHsgSW50ZXJwb2xhdGlvbk5vZGUsIE5vZGVUeXBlcyB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIlxuaW1wb3J0IHsgQ29tcGlsZXJDb250ZXh0IH0gZnJvbSBcIi4uLy4uL2NyZWF0ZS1jb21waWxlci1jb250ZXh0XCJcbmltcG9ydCB7IHByaW50VmFsdWVJblRlbXBsYXRlIH0gZnJvbSBcIi4uLy4uL2V4ZWN1dGUvcHJpbnQtcmVuZGVyaW5nLWNvbnRleHRcIlxuaW1wb3J0IHsgcGF0Y2hOb2RlIH0gZnJvbSBcIi4uL2FzdC1oZWxwZXJzXCJcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUludGVycG9sYXRpb24gPSAobm9kZTogSW50ZXJwb2xhdGlvbk5vZGUsIGN0eDogQ29tcGlsZXJDb250ZXh0KSA9PiB7XG4gIGlmIChub2RlLmNvbnRlbnQudHlwZSAhPT0gTm9kZVR5cGVzLlNJTVBMRV9FWFBSRVNTSU9OKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IHNpbXBsZSBleHByZXNzaW9ucyBhcmUgc3VwcG9ydGVkIGluIHRleHQgaW50ZXJwb2xhdGlvbnMnKVxuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gY3R4LmV4ZWN1dGUobm9kZS5jb250ZW50LmNvbnRlbnQpXG5cbiAgcGF0Y2hOb2RlKG5vZGUsIHtcbiAgICB0eXBlOiBOb2RlVHlwZXMuVEVYVCxcbiAgICBjb250ZW50OiBwcmludFZhbHVlSW5UZW1wbGF0ZShyZXN1bHQsICdJbnRlcnBvbGF0aW9uJyksXG4gICAgbG9jOiBub2RlLmxvY1xuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1yb290LW5vZGUtYXR0cnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tcm9vdC1ub2RlLWF0dHJzLnRzXCI7aW1wb3J0IHsgQ29uc3RhbnRUeXBlcywgRWxlbWVudE5vZGUsIE5vZGVUeXBlcyB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIjtcbmltcG9ydCB7IENvbXBpbGVyQ29udGV4dCB9IGZyb20gXCIuLi8uLi9jcmVhdGUtY29tcGlsZXItY29udGV4dFwiO1xuaW1wb3J0IHsgaXNQcm9wQXR0cmlidXRlIH0gZnJvbSBcIi4uL2FzdC1oZWxwZXJzXCI7XG5cbi8qKiBBcHBseSBhdHRyaWJ1dGVzIHRvIHJvb3QgZWxlbWVudCAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVJvb3ROb2RlQXR0cnMgPSAocm9vdE5vZGU6IEVsZW1lbnROb2RlLCBjdHg6IENvbXBpbGVyQ29udGV4dCkgPT4ge1xuICBjdHguZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJlY3RpdmUpID0+IHtcbiAgICByb290Tm9kZS5wcm9wcy5wdXNoKGRpcmVjdGl2ZSlcbiAgfSlcblxuICBjdHguYXR0cnMuZm9yRWFjaCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKG5hbWUgPT09ICdjbGFzcycgfHwgbmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgY29uc3QgcHJvcCA9IHJvb3ROb2RlLnByb3BzLmZpbmQoKHByb3ApID0+IHByb3AubmFtZSA9PT0gbmFtZSlcblxuICAgICAgaWYgKCFwcm9wIHx8ICEoJ3ZhbHVlJyBpbiBwcm9wKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFwcm9wLnZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgcHJvcCB2YWx1ZScpXG4gICAgICB9XG5cbiAgICAgIHByb3AudmFsdWUuY29udGVudCA9IGAke3Byb3AudmFsdWUuY29udGVudH0gJHt2YWx1ZX1gXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocm9vdE5vZGUucHJvcHMuZmluZCgocHJvcCkgPT4gcHJvcC5uYW1lID09PSBuYW1lICYmIGlzUHJvcEF0dHJpYnV0ZShwcm9wKSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJvb3ROb2RlLnByb3BzLnB1c2goe1xuICAgICAgdHlwZTogTm9kZVR5cGVzLkFUVFJJQlVURSxcbiAgICAgIG5hbWUsXG4gICAgICBuYW1lTG9jOiB7XG4gICAgICAgIHN0YXJ0OiB7IG9mZnNldDogLTEsIGNvbHVtbjogLTEsIGxpbmU6IC0xIH0sXG4gICAgICAgIGVuZDogeyBvZmZzZXQ6IC0xLCBjb2x1bW46IC0xLCBsaW5lOiAtMSB9LFxuICAgICAgICBzb3VyY2U6ICcnXG4gICAgICB9LFxuICAgICAgbG9jOiB7XG4gICAgICAgIHN0YXJ0OiB7IG9mZnNldDogLTEsIGNvbHVtbjogLTEsIGxpbmU6IC0xIH0sXG4gICAgICAgIGVuZDogeyBvZmZzZXQ6IC0xLCBjb2x1bW46IC0xLCBsaW5lOiAtMSB9LFxuICAgICAgICBzb3VyY2U6ICcnXG4gICAgICB9LFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgdHlwZTogTm9kZVR5cGVzLlRFWFQsXG4gICAgICAgIGNvbnRlbnQ6IFN0cmluZyh2YWx1ZSksXG4gICAgICAgIGxvYzoge1xuICAgICAgICAgIHN0YXJ0OiB7IG9mZnNldDogLTEsIGNvbHVtbjogLTEsIGxpbmU6IC0xIH0sXG4gICAgICAgICAgZW5kOiB7IG9mZnNldDogLTEsIGNvbHVtbjogLTEsIGxpbmU6IC0xIH0sXG4gICAgICAgICAgc291cmNlOiAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBjdHguZHluYW1pY0F0dHJzLmZvckVhY2goKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGlmIChyb290Tm9kZS5wcm9wcy5maW5kKChwcm9wKSA9PiBwcm9wLm5hbWUgPT09IG5hbWUgJiYgIWlzUHJvcEF0dHJpYnV0ZShwcm9wKSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJvb3ROb2RlLnByb3BzLnB1c2goe1xuICAgICAgdHlwZTogTm9kZVR5cGVzLkRJUkVDVElWRSxcbiAgICAgIG5hbWU6ICdiaW5kJyxcbiAgICAgIGxvYzoge1xuICAgICAgICBzdGFydDogeyBvZmZzZXQ6IC0xLCBjb2x1bW46IC0xLCBsaW5lOiAtMSB9LFxuICAgICAgICBlbmQ6IHsgb2Zmc2V0OiAtMSwgY29sdW1uOiAtMSwgbGluZTogLTEgfSxcbiAgICAgICAgc291cmNlOiAnJ1xuICAgICAgfSxcbiAgICAgIGV4cDoge1xuICAgICAgICB0eXBlOiBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04sXG4gICAgICAgIGNvbnRlbnQ6IHZhbHVlLFxuICAgICAgICBsb2M6IHtcbiAgICAgICAgICBzdGFydDogeyBvZmZzZXQ6IC0xLCBjb2x1bW46IC0xLCBsaW5lOiAtMSB9LFxuICAgICAgICAgIGVuZDogeyBvZmZzZXQ6IC0xLCBjb2x1bW46IC0xLCBsaW5lOiAtMSB9LFxuICAgICAgICAgIHNvdXJjZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdGF0aWM6IGZhbHNlLFxuICAgICAgICBjb25zdFR5cGU6IENvbnN0YW50VHlwZXMuTk9UX0NPTlNUQU5UXG4gICAgICB9LFxuICAgICAgYXJnOiB7XG4gICAgICAgIHR5cGU6IE5vZGVUeXBlcy5TSU1QTEVfRVhQUkVTU0lPTixcbiAgICAgICAgY29udGVudDogbmFtZSxcbiAgICAgICAgbG9jOiB7XG4gICAgICAgICAgc3RhcnQ6IHsgb2Zmc2V0OiAtMSwgY29sdW1uOiAtMSwgbGluZTogLTEgfSxcbiAgICAgICAgICBlbmQ6IHsgb2Zmc2V0OiAtMSwgY29sdW1uOiAtMSwgbGluZTogLTEgfSxcbiAgICAgICAgICBzb3VyY2U6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3RhdGljOiB0cnVlLFxuICAgICAgICBjb25zdFR5cGU6IENvbnN0YW50VHlwZXMuQ0FOX1NUUklOR0lGWVxuICAgICAgfSxcbiAgICAgIG1vZGlmaWVyczogW11cbiAgICB9KVxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS90cmFuc2Zvcm0tbm9kZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2FzdC10cmFuc2Zvcm0vdHJhbnNmb3JtLW5vZGUudHNcIjtpbXBvcnQgeyBSb290Tm9kZSx0eXBlIEVsZW1lbnROb2RlIH0gZnJvbSBcIkB2dWUvY29tcGlsZXItY29yZVwiO1xuaW1wb3J0IHsgdHlwZSBWaXJ0dWFsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NyZWF0ZS12aXJ0dWFsLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgY3JlYXRlQ29tcGlsZXJDb250ZXh0LCB0eXBlIENvbXBpbGVyQ29udGV4dCB9IGZyb20gXCIuLi9jcmVhdGUtY29tcGlsZXItY29udGV4dFwiO1xuaW1wb3J0IHsgIHdhbGssIH0gZnJvbSAnLi93YWxrJ1xuaW1wb3J0IHsgaXNOb2RlRWxlbWVudCwgaXNOb2RlSGFzQ2hpbGRyZW4sIGlzTm9kZUludGVycG9sYXRpb24sIGlzTm9kZVNsb3QsIGlzTm9kZVRlbXBsYXRlU2xvdCwgaXNQcm9wRGlyZWN0aXZlIH0gZnJvbSBcIi4vYXN0LWhlbHBlcnNcIjtcbmltcG9ydCB7IHRyYW5zZm9ybVNsb3ROb2RlIH0gZnJvbSBcIi4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1zbG90LW5vZGVcIjtcbmltcG9ydCB7IG1lcmdlRHVwbGljYXRlLCB0cmFuc2Zvcm1Qcm9wQmluZCB9IGZyb20gXCIuL3RyYW5zZm9ybWVycy90cmFuc2Zvcm0tcHJvcC1iaW5kXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1JbnRlcnBvbGF0aW9uIH0gZnJvbSBcIi4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybS1pbnRlcnBvbGF0aW9uXCI7XG5pbXBvcnQgeyB0cmFuc2Zvcm1Sb290Tm9kZUF0dHJzIH0gZnJvbSAnLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtLXJvb3Qtbm9kZS1hdHRycydcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUFzdFdpdGhDb250ZXh0ID0gPFQgZXh0ZW5kcyBFbGVtZW50Tm9kZSB8IFJvb3ROb2RlPihub2RlOiBULCBjdHg6IENvbXBpbGVyQ29udGV4dCkgPT4ge1xuICBpZiAoJ19fdmlydHVhbENvbXBvbmVudFRyYW5zZm9ybWVkJyBpbiBub2RlICYmIG5vZGUuX192aXJ0dWFsQ29tcG9uZW50VHJhbnNmb3JtZWQpIHtcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgd2Fsayhub2RlLCAobm9kZSwgcGFyZW50KSA9PiB7XG4gICAgaWYgKGlzTm9kZVNsb3Qobm9kZSkpIHtcbiAgICAgIGlmICghaXNOb2RlRWxlbWVudChwYXJlbnQpKSB7IHJldHVybiB9XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1TbG90Tm9kZShub2RlLCBwYXJlbnQsIGN0eClcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlRWxlbWVudChub2RlKSAmJiBpc05vZGVIYXNDaGlsZHJlbihwYXJlbnQpKSB7XG4gICAgICBub2RlLnByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgaWYgKGlzUHJvcERpcmVjdGl2ZShwcm9wKSAmJiBub2RlLnByb3BzLmluY2x1ZGVzKHByb3ApKSB7XG4gICAgICAgICAgdHJhbnNmb3JtUHJvcEJpbmQocHJvcCwgbm9kZSwgcGFyZW50LCBjdHgpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIG5vZGUucHJvcHMgPSBtZXJnZUR1cGxpY2F0ZShub2RlLnByb3BzKVxuICAgIH1cblxuICAgIGlmIChpc05vZGVJbnRlcnBvbGF0aW9uKG5vZGUpKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtSW50ZXJwb2xhdGlvbihub2RlLCBjdHgpXG4gICAgfVxuICB9KVxuXG4gIGlmIChjdHguYXR0cnMubGVuZ3RoID4gMCB8fCBjdHguZHluYW1pY0F0dHJzLmxlbmd0aCA+IDAgfHwgY3R4LmRpcmVjdGl2ZXMubGVuZ3RoID4gMCkge1xuICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2RlLmNoaWxkcmVuWzBdXG5cbiAgICAgIGlmIChpc05vZGVFbGVtZW50KHJvb3ROb2RlKSkge1xuICAgICAgICB0cmFuc2Zvcm1Sb290Tm9kZUF0dHJzKHJvb3ROb2RlLCBjdHgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBwYXNzIGF0dHJpYnV0ZXMuIEV4cGVjdGVkIHZpcnR1YWwgY29tcG9uZW50IHJvb3Qgbm9kZSB0byBiZSBFbGVtZW50JylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gcGFzcyBhdHRyaWJ1dGVzLiBFeHBlY3RlZCB2aXJ0dWFsIGNvbXBvbmVudCB0byBoYXZlIG9ubHkgb25lIHJvb3Qgbm9kZScpXG4gICAgfVxuICB9XG5cbiAgKG5vZGUgYXMgYW55KS5fX3ZpcnR1YWxDb21wb25lbnRUcmFuc2Zvcm1lZCA9IHRydWVcblxuICByZXR1cm4gbm9kZVxufVxuXG4vKiogQXBwbHkgdmlydHVhbCBjb21wb25lbnQgdG8gQVNUIE5vZGUgKi9cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Bc3ROb2RlID0gKG5vZGU6IEVsZW1lbnROb2RlLCBjb21wb25lbnQ6IFZpcnR1YWxDb21wb25lbnQpID0+IHtcbiAgY29uc3QgY3R4ID0gY3JlYXRlQ29tcGlsZXJDb250ZXh0KG5vZGUsIGNvbXBvbmVudClcbiAgY29uc3QgbmV3QXN0ID0gc3RydWN0dXJlZENsb25lKGNvbXBvbmVudC50ZW1wbGF0ZUFzdClcblxuICB0cmFuc2Zvcm1Bc3RXaXRoQ29udGV4dChuZXdBc3QsIGN0eClcblxuICByZXR1cm4ge1xuICAgIGFzdDogbmV3QXN0LFxuICAgIGltcG9ydHM6IGN0eC5pbXBvcnRzXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3JlbmRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9hc3QtdHJhbnNmb3JtL3JlbmRlci9yZW5kZXItdGVtcGxhdGUtYXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9yZW5kZXIvcmVuZGVyLXRlbXBsYXRlLWFzdC50c1wiO2ltcG9ydCB7IEVsZW1lbnROb2RlLCBOb2RlVHlwZXMsIFJvb3ROb2RlLCBUZW1wbGF0ZUNoaWxkTm9kZSB9IGZyb20gXCJAdnVlL2NvbXBpbGVyLWNvcmVcIjtcblxuZnVuY3Rpb24gdGFiKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiAnICcucmVwZWF0KHNpemUpXG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhZyhub2RlOiBFbGVtZW50Tm9kZSk6IHN0cmluZyB7XG4gIGlmIChub2RlLnByb3BzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBgJHtub2RlLnRhZ31gXG4gIH1cblxuICBjb25zdCBwcm9wcyA9IG5vZGUucHJvcHNcbiAgICAubWFwKChwcm9wKSA9PiB7XG4gICAgICBpZiAocHJvcC50eXBlID09PSBOb2RlVHlwZXMuRElSRUNUSVZFKSB7XG4gICAgICAgIGlmIChwcm9wLm5hbWUgPT09ICdiaW5kJyAmJiBwcm9wLmV4cD8udHlwZSA9PT0gTm9kZVR5cGVzLlNJTVBMRV9FWFBSRVNTSU9OICYmIHByb3AuYXJnPy50eXBlID09PSBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04pIHtcbiAgICAgICAgICByZXR1cm4gYDoke3Byb3AuYXJnPy5jb250ZW50fT1cIiR7cHJvcC5leHAuY29udGVudH1cImBcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcC5uYW1lID09PSAnaWYnICYmIHByb3AuZXhwPy50eXBlID09PSBOb2RlVHlwZXMuU0lNUExFX0VYUFJFU1NJT04pIHtcbiAgICAgICAgICByZXR1cm4gYCR7cHJvcC5yYXdOYW1lfT1cIiR7cHJvcC5leHAuY29udGVudH1cImBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wLmxvYy5zb3VyY2VcbiAgICAgIH1cblxuICAgICAgaWYgKCFwcm9wLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9wLm5hbWV9YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cHJvcC5uYW1lfT1cIiR7cHJvcC52YWx1ZS5jb250ZW50fVwiYFxuICAgIH0pXG5cbiAgcmV0dXJuIGAke25vZGUudGFnfSAke3Byb3BzLmpvaW4oJyAnKX1gXG59XG5cbmZ1bmN0aW9uIHJlbmRlckVsZW1lbnQobm9kZTogVGVtcGxhdGVDaGlsZE5vZGUsIHRhYnNpemUgPSAwKTogc3RyaW5nIHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gTm9kZVR5cGVzLkVMRU1FTlQpIHtcbiAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0YWIodGFic2l6ZSkgKyBgPCR7cmVuZGVyVGFnKG5vZGUpfSAvPmBcbiAgICB9XG5cbiAgICByZXR1cm4gdGFiKHRhYnNpemUpICsgYDwke3JlbmRlclRhZyhub2RlKX0+XFxuYFxuICAgICAgKyBub2RlLmNoaWxkcmVuLm1hcCgoYykgPT4ge1xuICAgICAgICByZXR1cm4gcmVuZGVyRWxlbWVudChjLCB0YWJzaXplICsgMikgKyAnXFxuJ1xuICAgICAgfSkuam9pbignJylcbiAgICAgICsgdGFiKHRhYnNpemUpICsgYDwvJHtub2RlLnRhZ30+YFxuICB9XG5cbiAgaWYgKG5vZGUudHlwZSA9PT0gTm9kZVR5cGVzLlRFWFQpIHtcbiAgICByZXR1cm4gdGFiKHRhYnNpemUpICsgbm9kZS5jb250ZW50LnRyaW0oKVxuICB9XG5cbiAgaWYgKG5vZGUubG9jLnNvdXJjZSkge1xuICAgIHJldHVybiB0YWIodGFic2l6ZSkgKyBub2RlLmxvYy5zb3VyY2VcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgdW5oYW5kbGVkIG5vZGUgdHlwZTogJHtub2RlLnR5cGV9YClcbn1cblxuZXhwb3J0IGNvbnN0IHJlbmRlclRlbXBsYXRlQXN0ID0gKHRlbXBsYXRlQXN0OiBSb290Tm9kZSkgPT4ge1xuICBsZXQgdGVtcGxhdGUgPSAnJ1xuXG4gIHRlbXBsYXRlQXN0LmNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICB0ZW1wbGF0ZSArPSByZW5kZXJFbGVtZW50KG5vZGUpXG4gIH0pXG5cbiAgcmV0dXJuIHRlbXBsYXRlXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9yZW5kZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9yZW5kZXIvaW5kZW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvYXN0LXRyYW5zZm9ybS9yZW5kZXIvaW5kZW50LnRzXCI7aW1wb3J0IHsgRWxlbWVudE5vZGUgfSBmcm9tIFwiQHZ1ZS9jb21waWxlci1jb3JlXCJcblxuZXhwb3J0IGNvbnN0IGdldE5vZGVJbmRlbnQgPSAobm9kZTogRWxlbWVudE5vZGUsIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gIGxldCBpbmRlbnQgPSAwXG5cbiAgZm9yIChsZXQgaSA9IG5vZGUubG9jLnN0YXJ0Lm9mZnNldCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKHNvdXJjZVtpXSA9PT0gJ1xcbicpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaW5kZW50KytcbiAgfVxuXG4gIHJldHVybiBpbmRlbnRcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEluZGVudCA9IChzb3VyY2U6IHN0cmluZywgaW5kZW50OiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIHNvdXJjZS5yZXBsYWNlKC9cXG4vZywgYFxcbiR7JyAnLnJlcGVhdChpbmRlbnQpfWApXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50LnRzXCI7aW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VWdWUsIGNvbXBpbGVTY3JpcHQgfSBmcm9tIFwiQHZ1ZS9jb21waWxlci1zZmNcIlxuaW1wb3J0IHsgZXh0cmFjdERlZmluZVByb3BzLCBleHRyYWN0UHJvcERlZmF1bHRzIH0gZnJvbSAnLi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQvZGVmaW5lLXByb3BzJ1xuaW1wb3J0IHsgY3JlYXRlU2NyaXB0U2V0dXBDb250ZXh0IH0gZnJvbSAnLi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQvc2NyaXB0LXNldHVwJ1xuaW1wb3J0IHsgZXhlY3V0ZU1vZHVsZSB9IGZyb20gJy4vZXhlY3V0ZS9leGVjdXRlLW1vZHVsZSdcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpcnR1YWxDb21wb25lbnQgPSBhc3luYyAoY29tcG9uZW50TmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBwYXJzZVZ1ZShzb3VyY2UpXG5cbiAgaWYgKCFyZXN1bHQuZGVzY3JpcHRvci50ZW1wbGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdGVtcGxhdGUgZm91bmQgaW4gY29tcG9uZW50ICR7Y29tcG9uZW50TmFtZX1gKVxuICB9XG5cbiAgaWYgKCFyZXN1bHQuZGVzY3JpcHRvci50ZW1wbGF0ZS5hc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIEFTVCBmb3VuZCBpbiBjb21wb25lbnQgJHtjb21wb25lbnROYW1lfWApXG4gIH1cblxuICAvLyBUT0RPOiBQYXJzZSAkb25Db21waWxlIGZ1bmN0aW9uc1xuICAvLyBjb25zdCBzY3JpcHQgPSByZXN1bHQuZGVzY3JpcHRvci5zY3JpcHRTZXR1cD8uY29udGVudCA/PyBudWxsXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBjb21wb25lbnROYW1lLFxuICAgIHRlbXBsYXRlU291cmNlOiByZXN1bHQuZGVzY3JpcHRvci50ZW1wbGF0ZS5jb250ZW50LFxuICAgIHRlbXBsYXRlQXN0OiByZXN1bHQuZGVzY3JpcHRvci50ZW1wbGF0ZS5hc3QsXG4gICAgc291cmNlOiBzb3VyY2UudHJpbSgpLFxuICAgIHNjcmlwdDoge1xuICAgICAgcHJvcHM6IGV4dHJhY3REZWZpbmVQcm9wcyhzb3VyY2UpLFxuICAgICAgcHJvcHNEZWZhdWx0czogZXh0cmFjdFByb3BEZWZhdWx0cyhzb3VyY2UpLFxuICAgICAgc2NyaXB0U2V0dXBDb250ZW50OiBjcmVhdGVTY3JpcHRTZXR1cENvbnRleHQocmVzdWx0LmRlc2NyaXB0b3IpLFxuICAgICAgc2NyaXB0U2V0dXA6IGV4ZWN1dGVNb2R1bGUoY29tcGlsZVNjcmlwdChyZXN1bHQuZGVzY3JpcHRvciwgeyBpZDogJ3Rlc3QnIH0pLmNvbnRlbnQpLFxuICAgICAgLy8gb25Db21waWxlRnVuY3Rpb246IGV4dHJhY3RGdW5jdGlvbkJvZGllcyhzb3VyY2UpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFZpcnR1YWxDb21wb25lbnQgPSBBd2FpdGVkPFJldHVyblR5cGU8dHlwZW9mIGNyZWF0ZVZpcnR1YWxDb21wb25lbnQ+PlxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2NyZWF0ZS12aXJ0dWFsLWNvbXBvbmVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQvZGVmaW5lLXByb3BzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50L2RlZmluZS1wcm9wcy50c1wiO2ltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tIFwiLi4vZXhlY3V0ZS9leGVjdXRlXCJcblxuY29uc3QgZXh0cmFjdEFyZ3MgPSAoY29kZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gIGxldCBzdGFydCA9IGNvZGUuaW5kZXhPZignZGVmaW5lUHJvcHMoJywgaW5kZXgpXG5cbiAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gT2JqZWN0IHN0YXJ0cyBhZnRlciAnZGVmaW5lUHJvcHMoJ1xuICBzdGFydCA9IHN0YXJ0ICsgJ2RlZmluZVByb3BzKCcubGVuZ3RoXG5cbiAgbGV0IG9wZW5QYXJlbnMgPSAxXG4gIGxldCBmdW5jU3RhcnQgPSBzdGFydFxuXG4gIHdoaWxlIChvcGVuUGFyZW5zID4gMCAmJiBmdW5jU3RhcnQgPCBjb2RlLmxlbmd0aCkge1xuICAgIGZ1bmNTdGFydCsrXG4gICAgaWYgKGNvZGVbZnVuY1N0YXJ0XSA9PT0gJygnKSBvcGVuUGFyZW5zKytcbiAgICBpZiAoY29kZVtmdW5jU3RhcnRdID09PSAnKScpIG9wZW5QYXJlbnMtLVxuICB9XG5cbiAgcmV0dXJuIGNvZGUuc2xpY2Uoc3RhcnQsIGZ1bmNTdGFydCkudHJpbSgpXG59XG5cbmNvbnN0IGV4dHJhY3RHZW5lcmljQXJncyA9IChjb2RlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgbGV0IHN0YXJ0ID0gY29kZS5pbmRleE9mKCdkZWZpbmVQcm9wczwnLCBpbmRleClcblxuICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBPYmplY3Qgc3RhcnRzIGFmdGVyICdkZWZpbmVQcm9wczwnXG4gIHN0YXJ0ID0gc3RhcnQgKyAnZGVmaW5lUHJvcHM8Jy5sZW5ndGhcblxuICBsZXQgb3BlblBhcmVucyA9IDFcbiAgbGV0IGZ1bmNTdGFydCA9IHN0YXJ0XG5cbiAgd2hpbGUgKG9wZW5QYXJlbnMgPiAwICYmIGZ1bmNTdGFydCA8IGNvZGUubGVuZ3RoKSB7XG4gICAgZnVuY1N0YXJ0KytcbiAgICBpZiAoY29kZVtmdW5jU3RhcnRdID09PSAnPCcpIG9wZW5QYXJlbnMrK1xuICAgIGlmIChjb2RlW2Z1bmNTdGFydF0gPT09ICc+Jykgb3BlblBhcmVucy0tXG4gIH1cblxuICByZXR1cm4gY29kZS5zbGljZShzdGFydCwgZnVuY1N0YXJ0KS50cmltKClcbn1cblxuY29uc3QgcGFyc2VPYmplY3RLZXlzID0gKGNvZGU6IHN0cmluZykgPT4ge1xuICBpZiAoY29kZS5pbmRleE9mKCd7JykgPT09IC0xKSB7XG4gICAgY29uc29sZS5lcnJvcignVW5hYmxlIHRvIGZpbmQgb2JqZWN0IGtleXMnLCBjb2RlKVxuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgb2JqZWN0IGtleXMnKVxuICB9XG5cbiAgbGV0IHN0YXJ0ID0gY29kZS5pbmRleE9mKCd7JykgKyAxXG4gIGxldCBvcGVuQnJhY2VzID0gMVxuICBsZXQga2V5U3RhcnQgPSBzdGFydFxuXG4gIGNvbnN0IGtleXMgPSBbXVxuXG4gIHdoaWxlIChvcGVuQnJhY2VzID4gMCAmJiBrZXlTdGFydCA8IGNvZGUubGVuZ3RoKSB7XG4gICAga2V5U3RhcnQrK1xuICAgIGlmIChjb2RlW2tleVN0YXJ0XSA9PT0gJ3snKSBvcGVuQnJhY2VzKytcbiAgICBpZiAoY29kZVtrZXlTdGFydF0gPT09ICd9Jykgb3BlbkJyYWNlcy0tXG5cbiAgICAvLyBJZ25vcmUgaXMgb2JqZWN0IGlzIG5lc3RlZCwgZm9yIGV4YW1wbGUgYXMgUHJvcFR5cGU8eyBuYW1lOiBzdHJpbmcgfT5cbiAgICBpZiAob3BlbkJyYWNlcyA+IDEpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGNvZGVba2V5U3RhcnRdID09PSAnOicpIHtcbiAgICAgIGtleXMucHVzaChjb2RlLnNsaWNlKHN0YXJ0LCBrZXlTdGFydCkudHJpbSgpKVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoY29kZVtrZXlTdGFydF0gPT09ICcsJykge1xuICAgICAgc3RhcnQgPSBrZXlTdGFydCArIDFcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2V5c1xufVxuXG5leHBvcnQgY29uc3QgZXh0cmFjdERlZmluZVByb3BzID0gKGNvZGU6IHN0cmluZykgPT4ge1xuICBsZXQgaW5kZXggPSAwXG5cbiAgY29uc3QgYXJncyA9IGV4dHJhY3RBcmdzKGNvZGUsIGluZGV4KVxuXG4gIGlmIChhcmdzKSB7XG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0S2V5cyhhcmdzKVxuICB9XG5cbiAgY29uc3QgZ2VuZXJpY0FyZ3MgPSBleHRyYWN0R2VuZXJpY0FyZ3MoY29kZSwgaW5kZXgpXG5cbiAgaWYgKGdlbmVyaWNBcmdzKSB7XG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0S2V5cyhnZW5lcmljQXJncylcbiAgfVxuXG4gIHJldHVybiBbXVxufVxuXG5jb25zdCByZXBsYWNlQ2hhckF0ID0gKHN0cjogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBuZXdDaGFyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpICsgbmV3Q2hhciArIHN0ci5zdWJzdHJpbmcoaW5kZXggKyAxKVxufVxuXG5leHBvcnQgY29uc3QgZXh0cmFjdFByb3BEZWZhdWx0cyA9IChjb2RlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgZGVmaW5lUHJvcHNTdGFydCA9IGNvZGUuaW5kZXhPZignZGVmaW5lUHJvcHMnKVxuXG4gIGNvbnN0IGRlZmluZVByb3BzRW5kID0gZGVmaW5lUHJvcHNTdGFydCArICdkZWZpbmVQcm9wcycubGVuZ3RoXG5cbiAgaWYgKGNvZGVbZGVmaW5lUHJvcHNFbmRdID09PSAnPCcpIHtcbiAgICBsZXQgaW5kZXggPSBkZWZpbmVQcm9wc1N0YXJ0XG4gICAgbGV0IG9ialN0YXJ0ID0gLTFcbiAgICBsZXQgb3BlbkJyYWNlcyA9IDBcbiAgICBsZXQgc3RyID0gJydcblxuICAgIHdoaWxlIChpbmRleCA+IDApIHtcbiAgICAgIGlmIChvcGVuQnJhY2VzID09PSAxICYmIGNvZGVbaW5kZXhdID09PSAnPScpIHtcbiAgICAgICAgY29kZSA9IHJlcGxhY2VDaGFyQXQoY29kZSwgaW5kZXgsICc6JylcbiAgICAgIH1cblxuICAgICAgaWYgKGNvZGVbaW5kZXhdID09PSAnfScpIHtcbiAgICAgICAgaWYgKG9wZW5CcmFjZXMgPT09IDApIHtcbiAgICAgICAgICBvYmpTdGFydCA9IGluZGV4ICsgMVxuICAgICAgICB9XG5cbiAgICAgICAgb3BlbkJyYWNlcysrXG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlW2luZGV4XSA9PT0gJ3snKSB7XG4gICAgICAgIGlmIChvcGVuQnJhY2VzID09PSAxKSB7XG4gICAgICAgICAgc3RyID0gY29kZS5zbGljZShpbmRleCwgb2JqU3RhcnQpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wZW5CcmFjZXMtLVxuICAgICAgfVxuXG4gICAgICBpbmRleC0tXG4gICAgfVxuXG4gICAgaWYgKCFzdHIpIHtcbiAgICAgIHJldHVybiB7fVxuICAgIH1cblxuICAgIGNvbnN0IG5ld0NvZGUgPSBgKCR7c3RyfSlgXG5cbiAgICByZXR1cm4gZXhlY3V0ZShuZXdDb2RlKSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gIH1cblxuICBpZiAoY29kZVtkZWZpbmVQcm9wc0VuZF0gPT09ICcoJykge1xuICAgIGxldCBpbmRleCA9IGRlZmluZVByb3BzU3RhcnRcbiAgICBsZXQgb3BlblBhcmVucyA9IDBcbiAgICBsZXQgc3RyID0gJydcblxuICAgIHdoaWxlIChpbmRleCA8IGNvZGUubGVuZ3RoKSB7XG4gICAgICBpZiAoY29kZVtpbmRleF0gPT09ICcpJykge1xuICAgICAgICBvcGVuUGFyZW5zLS1cblxuICAgICAgICBpZiAob3BlblBhcmVucyA9PT0gMCkge1xuICAgICAgICAgIHN0ciA9IGNvZGUuc2xpY2UoZGVmaW5lUHJvcHNFbmQsIGluZGV4ICsgMSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlW2luZGV4XSA9PT0gJygnKSB7XG4gICAgICAgIG9wZW5QYXJlbnMrK1xuICAgICAgfVxuXG4gICAgICBpbmRleCsrXG4gICAgfVxuXG4gICAgaWYgKCFzdHIudHJpbSgpKSB7XG4gICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICBjb25zdCBuZXdDb2RlID0gYCgke3N0cn0pYFxuXG4gICAgY29uc3QgcHJvcHNEZWNsYXJhdGlvbiA9IGV4ZWN1dGUobmV3Q29kZSkgYXMgUmVjb3JkPHN0cmluZywgYW55PlxuXG4gICAgY29uc3QgcHJvcHNEZWZhdWx0cyA9IHt9IGFzIFJlY29yZDxzdHJpbmcsIGFueT5cblxuICAgIE9iamVjdC5rZXlzKHByb3BzRGVjbGFyYXRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFwcm9wc0RlY2xhcmF0aW9uW2tleV0/LmRlZmF1bHQpIHtyZXR1cm4gfVxuICAgICAgcHJvcHNEZWZhdWx0c1trZXldID0gU3RyaW5nKHByb3BzRGVjbGFyYXRpb25ba2V5XT8uZGVmYXVsdClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb3BzRGVmYXVsdHNcbiAgfVxuXG4gIHJldHVybiB7fVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2NyZWF0ZS12aXJ0dWFsLWNvbXBvbmVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQvc2NyaXB0LXNldHVwLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9saWIvY3JlYXRlLXZpcnR1YWwtY29tcG9uZW50L3NjcmlwdC1zZXR1cC50c1wiO2ltcG9ydCB7IGNvbXBpbGVTY3JpcHQsIFNGQ0Rlc2NyaXB0b3IgfSBmcm9tICdAdnVlL2NvbXBpbGVyLXNmYydcbmltcG9ydCB7IE5vZGUsIFN0YXRlbWVudCwgTW9kdWxlRGVjbGFyYXRpb24sIE1lbWJlckV4cHJlc3Npb24sIFRlbXBsYXRlTGl0ZXJhbCwgUHJvZ3JhbSwgVmFyaWFibGVEZWNsYXJhdGlvbiwgRnVuY3Rpb25EZWNsYXJhdGlvbiB9IGZyb20gJ2Fjb3JuJ1xuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnXG5cbmV4cG9ydCB0eXBlIFNjcmlwdFNldHVwQ29udGV4dCA9IHtcblxufSAmIFJlY29yZDxzdHJpbmcsIGFueT5cblxuY29uc3Qgd2FsayA9IChub2RlOiBOb2RlIHwgU3RhdGVtZW50IHwgTW9kdWxlRGVjbGFyYXRpb24gfCBQcm9ncmFtLCBjYjogKG5vZGU6IE5vZGUpID0+IHZvaWQpID0+IHtcbiAgY2Iobm9kZSlcbiAgaWYgKCdib2R5JyBpbiBub2RlICYmIEFycmF5LmlzQXJyYXkoKG5vZGUgYXMgUHJvZ3JhbSkuYm9keSkpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIChub2RlIGFzIFByb2dyYW0pLmJvZHkpIHtcbiAgICAgIHdhbGsoY2hpbGQsIGNiKVxuICAgIH1cbiAgfVxuICBpZiAoJ2V4cHJlc3Npb24nIGluIG5vZGUgJiYgbm9kZS50eXBlID09PSAnRXhwcmVzc2lvblN0YXRlbWVudCcpIHtcbiAgICB3YWxrKG5vZGUuZXhwcmVzc2lvbiwgY2IpXG4gIH1cbiAgaWYgKCdsZWZ0JyBpbiBub2RlKSB7XG4gICAgd2Fsayhub2RlLmxlZnQsIGNiKVxuICB9XG4gIGlmICgncmlnaHQnIGluIG5vZGUpIHtcbiAgICB3YWxrKG5vZGUucmlnaHQsIGNiKVxuICB9XG4gIGlmICgnb2JqZWN0JyBpbiBub2RlKSB7XG4gICAgd2Fsayhub2RlLm9iamVjdCwgY2IpXG4gIH1cbiAgaWYgKG5vZGUudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG4gICAgd2Fsaygobm9kZSBhcyBNZW1iZXJFeHByZXNzaW9uKS5wcm9wZXJ0eSwgY2IpXG4gIH1cbiAgaWYgKG5vZGUudHlwZSA9PT0gJ1RlbXBsYXRlTGl0ZXJhbCcgJiYgJ2V4cHJlc3Npb25zJyBpbiBub2RlKSB7XG4gICAgZm9yIChjb25zdCBleHByZXNzaW9uIG9mIChub2RlIGFzIFRlbXBsYXRlTGl0ZXJhbCkuZXhwcmVzc2lvbnMpIHtcbiAgICAgIHdhbGsoZXhwcmVzc2lvbiwgY2IpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRyYW5zcGlsZVRzID0gKGNvZGU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdHMudHJhbnNwaWxlTW9kdWxlKGNvZGUsIHtcbiAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgIG1vZHVsZTogdHMuTW9kdWxlS2luZC5FU05leHQsXG4gICAgICB0YXJnZXQ6IHRzLlNjcmlwdFRhcmdldC5FU05leHQsXG4gICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTY3JpcHRTZXR1cENvbnRleHQgPSAoc2NyaXB0U2V0dXA6IFNGQ0Rlc2NyaXB0b3IpID0+IHtcbiAgaWYgKCFzY3JpcHRTZXR1cC5zY3JpcHRTZXR1cCkge1xuICAgIHJldHVybiB7XG4gICAgICBmdW5jdGlvbnM6IFtdLFxuICAgICAgdmFyaWFibGVzOiBbXSxcbiAgICAgIGZ1bmN0aW9uTmFtZXM6IFtdLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNjcmlwdCA9IGNvbXBpbGVTY3JpcHQoc2NyaXB0U2V0dXAsIHsgaWQ6ICd0ZXN0JyB9KVxuXG4gIC8vIGNvbnNvbGUubG9nKHNjcmlwdClcblxuICBpZiAoIXNjcmlwdC5zY3JpcHRTZXR1cEFzdCkge1xuICAgIHJldHVybiB7XG4gICAgICBmdW5jdGlvbnM6IFtdLFxuICAgICAgdmFyaWFibGVzOiBbXSxcbiAgICAgIGZ1bmN0aW9uTmFtZXM6IFtdLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNvdXJjZSA9IHNjcmlwdFNldHVwLnNjcmlwdFNldHVwPy5jb250ZW50ID8/ICcnXG5cbiAgY29uc3QgZnVuY3Rpb25zID0gW10gYXMgc3RyaW5nW11cbiAgY29uc3QgZnVuY3Rpb25OYW1lcyA9IFtdIGFzIHN0cmluZ1tdXG4gIGNvbnN0IHZhcmlhYmxlcyA9IFtdIGFzIHN0cmluZ1tdXG5cbiAgc2NyaXB0LnNjcmlwdFNldHVwQXN0LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICB3YWxrKG5vZGUgYXMgYW55LCAobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAobm9kZSBhcyBGdW5jdGlvbkRlY2xhcmF0aW9uKS5pZC5uYW1lXG4gICAgICAgIGZ1bmN0aW9uTmFtZXMucHVzaChuYW1lKVxuICAgICAgICBmdW5jdGlvbnMucHVzaChzb3VyY2Uuc2xpY2Uobm9kZS5zdGFydCwgbm9kZS5lbmQpKVxuICAgICAgfVxuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IGRlYyA9IG5vZGUgYXMgVmFyaWFibGVEZWNsYXJhdGlvblxuICAgICAgICBpZiAoZGVjLmRlY2xhcmF0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IG9uZSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBpcyBzdXBwb3J0ZWQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlYy5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSA9PT0gJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJykge1xuICAgICAgICAgIGlmIChkZWMuZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGlkZW50aWZpZXIgZGVjbGFyYXRpb25zIGFyZSBzdXBwb3J0ZWQuIE5vIGRlc3RydWN0dXJpbmcuJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbnMucHVzaChzb3VyY2Uuc2xpY2Uobm9kZS5zdGFydCwgbm9kZS5lbmQpKVxuICAgICAgICAgIGZ1bmN0aW9uTmFtZXMucHVzaChkZWMuZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUpXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHNvdXJjZS5zbGljZShub2RlLnN0YXJ0LCBub2RlLmVuZCkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIGZ1bmN0aW9ucy5mb3JFYWNoKChmbiwgaSkgPT4ge1xuICAgIGZ1bmN0aW9uc1tpXSA9IHRyYW5zcGlsZVRzKGZuKS5vdXRwdXRUZXh0XG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBmdW5jdGlvbnMsXG4gICAgZnVuY3Rpb25OYW1lcyxcbiAgICB2YXJpYWJsZXMsXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHMvbGliL2V4ZWN1dGUvZXhlY3V0ZS1tb2R1bGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL2xpYi9leGVjdXRlL2V4ZWN1dGUtbW9kdWxlLnRzXCI7ZXhwb3J0IGNvbnN0IGV4ZWN1dGVNb2R1bGUgPSBhc3luYyA8VD4oc2NyaXB0Q29kZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydChgZGF0YTp0ZXh0L2phdmFzY3JpcHQsJHtlbmNvZGVVUklDb21wb25lbnQoc2NyaXB0Q29kZSl9YCk7XG5cbiAgcmV0dXJuIG1vZHVsZSBhcyBUXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbTBrc2VtL0NvZGUvdnVlc3RpYy11aS9wYWNrYWdlcy9jb21waWxlci92aXJ0dWFsLWNvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tMGtzZW0vQ29kZS92dWVzdGljLXVpL3BhY2thZ2VzL2NvbXBpbGVyL3ZpcnR1YWwtY29tcG9uZW50cy9wbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL20wa3NlbS9Db2RlL3Z1ZXN0aWMtdWkvcGFja2FnZXMvY29tcGlsZXIvdmlydHVhbC1jb21wb25lbnRzL3BsdWdpbi50c1wiO2ltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyB0cmFuc2Zvcm1WdWUgfSBmcm9tICcuL2xpYi9hc3QtdHJhbnNmb3JtL3RyYW5zZm9ybS12dWUtZmlsZSdcbmltcG9ydCB7IGNyZWF0ZVZpcnR1YWxDb21wb25lbnQgfSBmcm9tICcuL2xpYi9jcmVhdGUtdmlydHVhbC1jb21wb25lbnQnXG5pbXBvcnQgeyByZWFkZGlyLCByZWFkRmlsZSB9IGZyb20gJ2ZzL3Byb21pc2VzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgcmVzb2x2ZUNvbXBvbmVudHNGcm9tQ29tcG9uZW50c0RpciA9IGFzeW5jIChjb21wb25lbnRzRGlyOiBzdHJpbmcgPSAnLi9zcmMvY29tcG9uZW50cycpID0+IHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKChhd2FpdCByZWFkZGlyKGNvbXBvbmVudHNEaXIpKVxuICAgIC5maWx0ZXIoKGZpbGUpID0+IGZpbGUuZW5kc1dpdGgoJy52dWUnKSlcbiAgICAubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZmlsZS5yZXBsYWNlKCcudnVlJywgJycpXG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGUocGF0aC5yZXNvbHZlKGNvbXBvbmVudHNEaXIsIGZpbGUpLCAndXRmLTgnKVxuICAgICAgcmV0dXJuIGNyZWF0ZVZpcnR1YWxDb21wb25lbnQobmFtZSwgY29udGVudClcbiAgICB9KSlcbn1cblxubGV0IGNvbXBvbmVudHMgPSBhd2FpdCByZXNvbHZlQ29tcG9uZW50c0Zyb21Db21wb25lbnRzRGlyKClcblxuLyoqIEFkZCBjc3MgbGF5ZXJzIHRvIFZ1ZXN0aWMgZmlsZXMgKi9cbmV4cG9ydCBjb25zdCB2aXJ0dWFsQ29tcG9uZW50czogUGx1Z2luID0ge1xuICBuYW1lOiAndnVlc3RpYzp2aXJ0dWFsLWNvbXBvbmVudHMnLFxuXG4gIHJlc29sdmVJZChpZCkge1xuICAgIGlmIChpZC5zdGFydHNXaXRoKCd2aXJ0dWFsLWNvbXBvbmVudHM6JykpIHtcbiAgICAgIHJldHVybiBpZFxuICAgIH1cbiAgfSxcblxuICBsb2FkKGlkKSB7XG4gICAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3ZpcnR1YWwtY29tcG9uZW50czonKSkge1xuICAgICAgY29uc3QgY29tcG9uZW50TmFtZSA9IGlkLnJlcGxhY2UoJ3ZpcnR1YWwtY29tcG9uZW50czonLCAnJylcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudHMuZmluZCgoYykgPT4gYy5uYW1lID09PSBjb21wb25lbnROYW1lKVxuXG4gICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmdW5jdGlvbnMsIGZ1bmN0aW9uTmFtZXMgfSA9IGNvbXBvbmVudC5zY3JpcHQuc2NyaXB0U2V0dXBDb250ZW50XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbnMuam9pbignXFxuJykgKyBgZXhwb3J0IHsgJHtmdW5jdGlvbk5hbWVzLmpvaW4oJywgJyl9IH1gXG4gICAgfVxuICB9LFxuXG4gIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgIC8vIE9ubHkgdHJhbnNmb3JtIENTUyBmaWxlc1xuICAgIGlmICghaWQuZW5kc1dpdGgoJy52dWUnKSkgcmV0dXJuIG51bGxcblxuICAgIGlmICghaWQuaW5jbHVkZXMoJ3BsYXlncm91bmQvc3JjJykpIHJldHVybiBudWxsXG5cbiAgICBjb25zdCByZXN1bHQgPSB0cmFuc2Zvcm1WdWUoY29kZSwgY29tcG9uZW50cylcblxuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiByZXN1bHQudG9TdHJpbmcoKSxcbiAgICAgIG1hcDogcmVzdWx0LmdlbmVyYXRlTWFwKHsgaGlyZXM6IGZhbHNlIH0pXG4gICAgfVxuICB9LFxuXG4gIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICBzZXJ2ZXIud2F0Y2hlci5hZGQoJy4vc3JjL2NvbXBvbmVudHMnKVxuICAgIHNlcnZlci53YXRjaGVyLm9uKCdjaGFuZ2UnLCBhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoJy52dWUnKSkge1xuICAgICAgICBjb21wb25lbnRzID0gYXdhaXQgcmVzb2x2ZUNvbXBvbmVudHNGcm9tQ29tcG9uZW50c0RpcigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sYUFBYTtBQUVwQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7OztBQ0x1VSxTQUFTLG9CQUE0Qjs7O0FDRTVYLElBQU0sV0FBVyxDQUFDLFFBQWEsT0FBTyxPQUFPLFFBQVEsWUFBWSxDQUFDLE1BQU0sUUFBUSxHQUFHO0FBTTVFLElBQU0sWUFBWSxDQUFDLFFBQWEsV0FBcUI7QUFDMUQsTUFBSSxDQUFDLFNBQVMsTUFBTSxHQUFHO0FBQ3JCLGFBQVMsQ0FBQztBQUFBLEVBQ1o7QUFFQSxTQUFPLEtBQUssTUFBTSxFQUFFLFFBQVEsU0FBTztBQUNqQyxVQUFNLGNBQWMsT0FBTyxHQUFHO0FBQzlCLFVBQU0sY0FBYyxPQUFPLEdBQUc7QUFF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QUN4RDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7O0FwQnpCQSxJQUFNLFNBQVMsYUFBYSxRQUFRO0FBQUEsRUFDbEMsUUFBUTtBQUNWLENBQUM7QUFFRCxJQUFNLGlCQUFvQztBQUFBLEVBQ3hDLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0Y7QUFFTyxJQUFNLFVBQVUsQ0FBQyxVQUFtQixDQUFDLE1BQWdCO0FBQzFELFlBQVUsVUFBVSxnQkFBZ0IsT0FBTztBQU8zQyxRQUFNLFVBQVUsQ0FBQztBQXVCakIsVUFBUSxLQUFLLGlCQUFpQjtBQUU5QixTQUFPO0FBQ1Q7OztBRHRGNE4sSUFBTSwyQ0FBMkM7QUFVN1EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQUUsVUFBVTtBQUFBLElBQ3BCLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELDhCQUE4QixjQUFjLElBQUksSUFBSSwrQkFBK0Isd0NBQWUsQ0FBQztBQUFBLElBQ3JHO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJNYWdpY1N0cmluZyIsICJub2RlIiwgIk5vZGVUeXBlcyIsICJFbGVtZW50VHlwZXMiLCAiTm9kZVR5cGVzIiwgIk5vZGVUeXBlcyIsICJFbGVtZW50VHlwZXMiLCAibm9kZSIsICJzY29wZSIsICJOb2RlVHlwZXMiLCAiRWxlbWVudFR5cGVzIiwgIk5vZGVUeXBlcyIsICJpc1Byb3BBdHRyaWJ1dGUiLCAiTm9kZVR5cGVzIiwgImlzUHJvcERpcmVjdGl2ZSIsICJFbGVtZW50VHlwZXMiLCAiTm9kZVR5cGVzIiwgIk5vZGVUeXBlcyIsICJpc1Byb3BBdHRyaWJ1dGUiLCAiTm9kZVR5cGVzIiwgIk5vZGVUeXBlcyIsICJwcm9wIiwgImlzUHJvcERpcmVjdGl2ZSIsICJpc1Byb3BBdHRyaWJ1dGUiLCAiTm9kZVR5cGVzIiwgIk5vZGVUeXBlcyIsICJOb2RlVHlwZXMiLCAicHJvcCIsICJpc1Byb3BBdHRyaWJ1dGUiLCAiTm9kZVR5cGVzIiwgIm5vZGUiLCAiaXNQcm9wRGlyZWN0aXZlIiwgIk5vZGVUeXBlcyIsICJOb2RlVHlwZXMiLCAidmlydHVhbENvbXBvbmVudHMiLCAiTWFnaWNTdHJpbmciLCAicGFyc2VWdWUiLCAiY29tcGlsZVNjcmlwdCIsICJ3YWxrIiwgIm5vZGUiLCAicGFyc2VWdWUiLCAiY29tcGlsZVNjcmlwdCJdCn0K
