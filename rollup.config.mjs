import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'rollup';
import ts from 'rollup-plugin-ts';

const dir = dirname(fileURLToPath(import.meta.url));

const src = join(dir, 'src');
const dist = join(dir, 'dist');

export default defineConfig([
  {
    input: join(src, 'index.ts'),
    plugins: [
      ts()
    ],
    output: {
      file: join(dist, 'index.mjs'),
      format: 'es'
    }
  },
  {
    input: join(src, 'index.ts'),
    plugins: [
      ts({
        tsconfig: {
          declaration: false
        }
      })
    ],
    output: {
      file: join(dist, 'index.cjs'),
      format: 'cjs'
    }
  }
]);