import renderTree from './renderTree';
import renderPlain from './renderPlain';
import parseInAst from './ast';
import parseInObj from './parsers';


const renders = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

const genDiff = (pathFile1, pathFile2, format = 'tree') => {
  const render = renders[format];
  const fileContent1 = parseInObj(pathFile1);
  const fileContent2 = parseInObj(pathFile2);
  const ast = parseInAst(fileContent1, fileContent2);

  return render(ast);
};

export default genDiff;
