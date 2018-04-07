import renderTree from './renderTree';
import parseInAst from './ast';
import parseInObj from './parse';


const renders = {
  tree: renderTree,
};

const genDiff = (pathFile1, pathFile2, format) => {
  const render = renders[format];
  const fileContent1 = parseInObj(pathFile1);
  const fileContent2 = parseInObj(pathFile2);
  const ast = parseInAst(fileContent1, fileContent2);

  return render(ast);
};

export default genDiff;
