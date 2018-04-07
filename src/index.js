import renderTree from './renderTree';
import parseInAst from './ast';
import parseInObj from './parse';


const renders = {
  tree: renderTree,
};

const genDiff = (path1, path2, format = 'inline') => {
  const render = renders[format];
  const content1 = parseInObj(path1);
  const content2 = parseInObj(path2);
  const diffTree = parseInAst(content1, content2);

  return render(diffTree);
};

export default genDiff;
