// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
              (componentName) => {
                if (componentName.startsWith('Va'))
                  return { name: componentName, from: 'vuestic-ui' }
              },
            ],
        }),
    ],
});
