# @vuestic/tailwind
To create a tight bind between Vuestic with Tailwind we have a @vuestic/tailwind package: it syncs breakpoint and color settings. You can sync from Vuestic UI to Tailwind or backwards!

### Usage

Three commands become available to you:

- `npx sync-tailwind-with-vuestic` - formats and transfers the color and breakpoints settings from the tailwind.config.* file (and in its absence, it uses the default Tailwind CSS configuration) to the root file vuestic.config.js (also added by this command);
- `npx watch-tailwind` - watches tailwind.config.* in background and synchronizes the Vuestic UI configuration on the fly;
- `npx sync-vuestic-with-tailwind` - transfers color and breakpoint settings from default Vuestic UI config to the Tailwind's configuration file (tailwind.config.cjs).