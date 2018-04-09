import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import astBuild from './ast';
import render from './renderers';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const genDiff = (pathFile1, pathFile2, format = 'tree') => {
  const fileExt = path.extname(pathFile1);
  const parse = parsers[fileExt];
  const content1 = parse(fs.readFileSync(pathFile1, 'utf-8'));
  const content2 = parse(fs.readFileSync(pathFile2, 'utf-8'));
  const diffTree = astBuild(content1, content2);

  return render(format)(diffTree);
};

export default genDiff;
