import _ from 'lodash';
import parsInAst from './ast';

export default (contentFileStr1, contentFileStr2) => {
  const ast = parsInAst(contentFileStr1, contentFileStr2);
  const render = (tree, depth = 0) => {
    const increaseSpace = (num = depth) => '  '.repeat(num);
    const result = _.flatten(tree.map((elem) => {
      const value = _.isObject(elem.value) ?
        `{\n${increaseSpace(depth + 4)}${Object.keys(elem.value)}: ${Object.values(elem.value)}\n${increaseSpace(depth + 2)}}` : elem.value;

      const newValue = _.isObject(elem.newValue) ?
        `{\n${increaseSpace(depth + 4)}${Object.keys(elem.newValue)}: ${Object.values(elem.newValue)}\n${increaseSpace(depth + 2)}}` :
        elem.newValue;


      const changed = _.isObject(elem.newValue) || _.isObject(elem.value) ? [`${increaseSpace()}  - ${elem.key}: ${value}`, `${increaseSpace()}  + ${elem.key}: ${newValue}`] :
        [`${increaseSpace()}  + ${elem.key}: ${newValue}`, `${increaseSpace()}  - ${elem.key}: ${value}`];

      const dispatcher = {
        'changed ': () => changed,
        'added ': () => `${increaseSpace()}  + ${elem.key}: ${value}`,
        'deleted ': () => `${increaseSpace()}  - ${elem.key}: ${value}`,
        'not ': () => `${increaseSpace()}    ${elem.key}: ${value}`,
        'child ': () => `${increaseSpace()}    ${elem.key}: ${render(elem.children, depth + 2)}`,
      };
      return dispatcher[elem.event]();
    })).join('\n');
    return `{\n${result}\n${increaseSpace()}}`;
  };
  return render(ast);
};
