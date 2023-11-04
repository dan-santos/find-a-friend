import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environmentMatchGlobs: [
      ['src/infra/**', 'prisma']
    ],
    dir: 'src',
    include: ['**/*.{e2e-spec,e2e-test,e2e}.?(c|m)[jt]s?(x)']
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});