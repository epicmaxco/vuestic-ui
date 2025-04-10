import { VirtualComponent } from "../../lib/create-virtual-component";

type VirtualComponentName = string; // Or `Vc${string}`

type VirtualComponentArguments = {
  staticProps: Record<string, string>,
  dynamicProps: Record<string, string>,
  staticAttrs: Record<string, string>,
  dynamicAttrs: Record<string, string>,
  slots: Record<string, string>
}

const crateVirtualComponentsRepository = () => {
  const virtualComponents = new Map<VirtualComponentName, VirtualComponent>();

  const componentArguments = new Map<VirtualComponentName, VirtualComponentArguments>();

  return {
    virtualComponents,
    componentArguments
  }
}

export const storage = crateVirtualComponentsRepository();
