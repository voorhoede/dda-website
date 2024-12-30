export function shuffle<T>(array: T[], seed: number): T[] {
  let m = array.length;
  let t: T;
  let i: number;

  while (m) {
    i = Math.floor(random(seed) * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

function random(seed: number): number {
  const x = Math.sin(seed++) * 10000;

  return x - Math.floor(x);
}
