import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

test('changing the contents of .json files', () => {
  const pathToFile1 = '__tests__/__fixtures__/json/before.json';
  const pathToFile2 = '__tests__/__fixtures__/json/after.json';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents of .yaml files', () => {
  const pathToFile1 = '__tests__/__fixtures__/yaml/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/yaml/after.yml';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});
