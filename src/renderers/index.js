import renderTree from './rendererTree';
import renderPlain from './rendererPlain';
import rendererJson from './rendererJson';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: rendererJson,
};

export default format => (ast) => {
  const render = renderers[format];
  return render(ast);
};
