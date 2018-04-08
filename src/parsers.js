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

export default parsInObj;
