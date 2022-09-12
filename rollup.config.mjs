import { join } from 'path';
import { defineConfig } from 'rollup';
import ts from 'rollup-plugin-ts';

const src = join(__dirname, 'src');
const dist = join(__dirname, 'dist');

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