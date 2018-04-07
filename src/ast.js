import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsInObj = (pathToFile) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const getpathToFile = fs.readFileSync(pathToFile, 'utf-8');
  const getFormat = path.extname(pathToFile);
  const parse = parsers[getFormat];

  return parse(getpathToFile);
};

const parsInAst = (contentFileStr1, contentFileStr2) => {
  const buildfirstObj = parsInObj(contentFileStr1);
  const buildlastObj = parsInObj(contentFileStr2);


  const astObject = (obj1, obj2) => {
    const joinArrays = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
    const joinObj = joinArrays.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          const children = astObject(obj1[key], obj2[key]);

          return { key, event: 'child ', children };
        }
        if (obj1[key] !== obj2[key]) {
          return {
            key,
            event: 'changed ',
            value: obj1[key],
            newValue: obj2[key],
          };
        }
        return { key, event: 'not ', value: obj2[key] };
      }

      if (_.has(obj1, key)) {
        return { key, event: 'deleted ', value: obj1[key] };
      }

      return { key, event: 'added ', value: obj2[key] };
    });

    return joinObj;
  };
  return astObject(buildfirstObj, buildlastObj);
};

export default parsInAst;
