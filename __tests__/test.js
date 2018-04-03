import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

const pathToFile1 = '__tests__/__fixtures__/before.json';
const pathToFile2 = '__tests__/__fixtures__/after.json';

const decision = genDiff(pathToFile1, pathToFile2);

test('return the difference between the data as a string', () => {
  expect(decision).toBe(result);
});
