import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (pathToFile1, pathToFile2) => {
  const GetpathToFile1 =  fs.readFileSync(pathToFile1);
  const GetpathToFile2 =  fs.readFileSync(pathToFile2);

  const getFormat = path.extname(pathToFile1);

  const parse = parsers[getFormat];

  const firstObj = parse(GetpathToFile1);
  const lastObj = parse(GetpathToFile2);

  const getLine = (sing, name, value) => `${sing}${name}: ${value}\n`;

  const arr = Array.from(new Set([...Object.keys(firstObj), ...Object.keys(lastObj)]));

  const result = arr.map((elem) => {
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
