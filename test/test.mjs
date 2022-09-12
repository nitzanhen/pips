import assert from 'node:assert/strict';
// there doesn't seem to be support for node:test yet
// eslint-disable-next-line import/no-unresolved
import { describe, test } from 'node:test';
import { pipe } from '../dist/index.mjs';

describe('pipe', () => {

  test('Standard Factory', () => {
    const v1 = pipe(1)
      (x => x + 1)
      (x => x * 2)
      ();

    assert(v1 === 4);
  });

  test('Empty factory', () => {
    const v1 = pipe()
      (_ => 5 + 1)
      (x => x * 2)
      ();

    assert(v1 === 12);
  });

});