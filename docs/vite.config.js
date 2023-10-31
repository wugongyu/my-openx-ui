import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'node:path';

console.log(process.cwd);

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: /^@openxui\/(.+)$/,
        replacement: join(__dirname, '..', 'packages', '$1', 'src'),
      },
    ],
  },
});
