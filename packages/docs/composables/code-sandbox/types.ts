export type Dependencies = {
  [key: string]: string;
}

export type CodeSandboxConfig = {
  dependencies?: Dependencies,
  devDependencies?: Dependencies,
  requireIcons?: boolean,
}
