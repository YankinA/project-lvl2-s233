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
  const getpathToFile1 = fs.readFileSync(pathToFile1, 'utf-8');
  const getpathToFile2 = fs.readFileSync(pathToFile2, 'utf-8');

  const getFormat = path.extname(pathToFile1);

  const parse = parsers[getFormat];

  const firstObj = parse(getpathToFile1);
  const lastObj = parse(getpathToFile2);

  const joinArrays = Array.from(new Set([...Object.keys(firstObj), ...Object.keys(lastObj)]));

  const result = _.flatten(joinArrays.map((elem) => {
    if (_.has(firstObj, elem) && _.has(lastObj, elem)) {
      if (firstObj[elem] !== lastObj[elem]) {
        return [`  + ${elem}: ${lastObj[elem]}`, `  - ${elem}: ${firstObj[elem]}`];
      } return `    ${elem}: ${firstObj[elem]}`;
    } else if (!_.has(firstObj, elem) && _.has(lastObj, elem)) {
      return `  + ${elem}: ${lastObj[elem]}`;
    }
    return `  - ${elem}: ${firstObj[elem]}`;
  })).join('\n');
  return `{\n${result}\n}\n`;
};
