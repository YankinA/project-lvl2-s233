import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (pathToFile1, pathToFile2) => {
  const getpathToFile1 =  fs.readFileSync(pathToFile1, 'utf-8');
  const getpathToFile2 =  fs.readFileSync(pathToFile2, 'utf-8');

  const getFormat = path.extname(pathToFile1);

  const parse = parsers[getFormat];

  const firstObj = parse(getpathToFile1);
  const lastObj = parse(getpathToFile2);

  const getLine = (sing, name, value) => `${sing}${name}: ${value}\n`;

  const joinArrays = Array.from(new Set([...Object.keys(firstObj), ...Object.keys(lastObj)]));

  const result = joinArrays.map((elem) => {
    if (_.has(firstObj, elem) && _.has(lastObj, elem) && firstObj[elem] !== lastObj[elem]) {
      return `${getLine('  + ', elem, lastObj[elem])}${getLine('  - ', elem, firstObj[elem])}`;
    } else if (!_.has(firstObj, elem) && _.has(lastObj, elem)) {
      return getLine('  + ', elem, lastObj[elem]);
    } else if (_.has(firstObj, elem) && !_.has(lastObj, elem)) {
      return getLine('  - ', elem, firstObj[elem]);
    }
    return getLine('    ', elem, firstObj[elem]);
  }).join('');
  return `{\n${result}}\n`;
};
