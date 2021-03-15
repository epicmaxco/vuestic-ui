module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'vuestic-ui': '^1.0.0-alpha.15'
    }
  });

  const importString = "import { VuesticPlugin } from 'vuestic-ui';"
  api.injectImports(api.entryFile, importString);
  api.afterInvoke(() => {
    const fs = require('fs');
    const { EOL } = require('os');
    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g);
    const renderIndex = lines.findIndex(line => line.match(/vuestic-ui/));
    lines[renderIndex] += `\n\nVue.use(VuesticPlugin);`;
    fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' });
  });
}
