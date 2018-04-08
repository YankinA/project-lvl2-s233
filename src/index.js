import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import parseInAst from './ast';
import { renderTree, renderPlain } from './renderers';


const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

const genDiff = (pathFile1, pathFile2, format = 'tree') => {
  const render = renderers[format];
  const fileExt = path.extname(pathFile1);
  const parse = parsers[fileExt];
  const content1 = parse(fs.readFileSync(pathFile1, 'utf-8'));
  const content2 = parse(fs.readFileSync(pathFile2, 'utf-8'));
  const diffTree = parseInAst(content1, content2);

  return render(diffTree);
};

export default genDiff;
