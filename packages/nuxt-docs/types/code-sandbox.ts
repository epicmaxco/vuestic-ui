export type Dependencies = {
  [key: string]: string;
}

export type CodeSandboxConfig = {
  dependencies?: Dependencies,
  devDependencies?: Dependencies,
}

export type PathToExample = string

export type ExampleOptions = {
  hideCode?: boolean,
  forceShowCode?: boolean
  codeSandboxConfig?: CodeSandboxConfig
}
