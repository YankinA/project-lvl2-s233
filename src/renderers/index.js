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
  if (!render) {
    return throw new Error(`unkown render: ${render}`);
  }
  return render(ast);
};
