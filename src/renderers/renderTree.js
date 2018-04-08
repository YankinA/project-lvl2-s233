import _ from 'lodash';

export default (astTree) => {
  const render = (tree, depth = 0) => {
    const increaseSpace = (num = depth) => '  '.repeat(num);
    const result = _.flatten(tree.map((elem) => {
      const stringify = (valuesObj) => {
        if (_.isObject(valuesObj)) {
          return `{\n${increaseSpace(depth + 4)}${Object.keys(valuesObj)}: ${Object.values(valuesObj)}\n${increaseSpace(depth + 2)}}`;
        }
        return valuesObj;
      };

      const changed = _.isObject(elem.newValue) || _.isObject(elem.value) ? [`${increaseSpace()}  - ${elem.key}: ${stringify(elem.value)}`, `${increaseSpace()}  + ${elem.key}: ${stringify(elem.newValue)}`] :
        [`${increaseSpace()}  + ${elem.key}: ${stringify(elem.newValue)}`, `${increaseSpace()}  - ${elem.key}: ${stringify(elem.value)}`];

      const dispatcher = {
        changed: () => changed,
        added: () => `${increaseSpace()}  + ${elem.key}: ${stringify(elem.value)}`,
        deleted: () => `${increaseSpace()}  - ${elem.key}: ${stringify(elem.value)}`,
        unchanged: () => `${increaseSpace()}    ${elem.key}: ${stringify(elem.value)}`,
        child: () => `${increaseSpace()}    ${elem.key}: ${render(elem.children, depth + 2)}`,
      };
      return dispatcher[elem.type]();
    })).join('\n');
    return `{\n${result}\n${increaseSpace()}}`;
  };
  return `${render(astTree)}\n`;
};
