import { getInputPath } from "./input.ts";

export function getInput(): string {
  return Deno.readTextFileSync(getInputPath());
}

export function getInputLines(): string[] {
  const newLineRegex = /\r?\n/;
  return getInput().split(newLineRegex);
}

export function getInputGrid(): string[][] {
  return getInputLines().map((line) => line.split(""));
}

export function getInputNumbers(): number[] {
  return getInputLines().map((l) => parseInt(l));
}

export function getInputLinesMap<T>(parser: (line: string) => T): T[] {
  return getInputLines().map(parser);
}

export function count<T>(
  arr: Iterable<T>,
  predicate: (item: T) => boolean,
): number {
  let total = 0;

  for (const item of arr) {
    if (predicate(item)) {
      total += 1;
    }
  }

  return total;
}

export function sum(arr: number[]) {
  return arr.reduce((acc, el) => acc + el, 0);
}

export function average(arr: number[]): number {
  const { length } = arr;
  if (length == 0) {
    throw "Cannot average array of length 0";
  }

  return sum(arr) / length;
}

export function median(values: number[]) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2.0;
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc, el, i) => {
    const chunkIndex = Math.floor(i / size);
    acc[chunkIndex] = ([] as T[]).concat(acc[chunkIndex] || [], el);

    return acc;
  }, [] as T[][]);
}

export function create2DArray<T>(size: number | [number, number], value: T): T[][] {
  if (typeof (size) === 'number')
    return Array(size + 1).fill(null).map(() => Array(size + 1).fill(value));
  
  const [width, height] = size;
  return Array(height + 1).fill(null).map(() => Array(width + 1).fill(value));
}

export function memo<Y>(func: (input: string) => Y): (input: string) => Y {
  const cache = {} as { [key: string]: Y };

  return function (input: string): Y {
    if (input in cache) {
      return cache[input];
    }

    const value = func(input);
    cache[input] = value;

    return value;
  };
}

export function alphabetSort(str: string): string {
  return [...str].sort((a, b) => a.localeCompare(b)).join("");
}

export function intersection<Y>(a: Y[], b: Y[]): Y[] {
  return [...new Set(a.filter((x) => b.includes(x)))];
}

export function complement<Y>(a: Y[], b: Y[]): Y[] {
  return [...new Set(a.filter((x) => !b.includes(x)))];
}

export function sort<Y>(arr: Y[], comparison: (a: Y, b: Y) => number): Y[] {
  return [...arr].sort(comparison);
}

export function invertObject<X extends string | number | symbol, Y>(object: Record<X, Y>) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}