export type BayerSize = 2 | 4 | 8;

/** Ordered-dither matrix, built recursively: M(2n) = [[4M, 4M+2], [4M+3, 4M+1]]. */
export function bayerMatrix(n: BayerSize): number[][] {
  if (n === 2) {
    return [
      [0, 2],
      [3, 1],
    ];
  }
  const h = (n / 2) as BayerSize;
  const half = bayerMatrix(h);
  const m = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < h; x++) {
      const v = 4 * half[y][x];
      m[y][x] = v;
      m[y][x + h] = v + 2;
      m[y + h][x] = v + 3;
      m[y + h][x + h] = v + 1;
    }
  }
  return m;
}

/** Same matrix scaled to (0, 1): a pixel is "on" when its value exceeds this threshold. */
export function thresholdMatrix(n: BayerSize): number[][] {
  const d = n * n;
  return bayerMatrix(n).map((row) => row.map((v) => (v + 0.5) / d));
}
