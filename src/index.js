import _ from 'lodash';
import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const firstObj = JSON.parse(fs.readFileSync(pathToFile1));
  const lastObj = JSON.parse(fs.readFileSync(pathToFile2));

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
