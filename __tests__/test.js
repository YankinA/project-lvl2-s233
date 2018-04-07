import fs from 'fs';
import genDiff from '../src';

test('changing the contents of .json files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/json/before.json';
  const pathToFile2 = '__tests__/__fixtures__/json/after.json';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents of .yaml files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/yaml/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/yaml/after.yml';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents of .ini files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/ini/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/ini/after.ini';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});


test('changing the contents of the nested .json files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result_nested.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/json/__nested_structure__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/json/__nested_structure__/after.json';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents of the nested .yaml files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result_nested.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/yaml/__nested_structure__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/yaml/__nested_structure__/after.yml';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents of the nested .ini files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result_nested.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/ini/__nested_structure__/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/ini/__nested_structure__/after.ini';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result_plain.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/json/before.json';
  const pathToFile2 = '__tests__/__fixtures__/json/after.json';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});

test('changing the contents', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result_plain.txt', 'utf8');
  const pathToFile1 = '__tests__/__fixtures__/json/before.json';
  const pathToFile2 = '__tests__/__fixtures__/json/after.json';
  const decision = genDiff(pathToFile1, pathToFile2);

  expect(decision).toBe(result);
});
