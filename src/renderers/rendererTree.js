import _ from 'lodash';

export default (astTree) => {
  const render = (tree, depth = 0) => {
    const increaseSpace = (num = depth) => '  '.repeat(num);
    const sing = { deleted: '-', added: '+' };
    const formTree = _.flatten(tree.map((elem) => {
      const stringify = (valuesObj) => {
        if (_.isObject(valuesObj)) {
          return `{\n${increaseSpace(depth + 4)}${Object.keys(valuesObj)}: ${Object.values(valuesObj)}\n${increaseSpace(depth + 2)}}`;
        }
        return valuesObj;
      };

      const dispatcher = {
        changed: () => {
          const valueOld = `${increaseSpace()}  ${sing.deleted} ${elem.key}: ${stringify(elem.value)}`;
          const valueNew = `${increaseSpace()}  ${sing.added} ${elem.key}: ${stringify(elem.newValue)}`;
          return [valueOld, valueNew];
        },
        added: () => `${increaseSpace()}  ${sing.added} ${elem.key}: ${stringify(elem.value)}`,
        deleted: () => `${increaseSpace()}  ${sing.deleted} ${elem.key}: ${stringify(elem.value)}`,
        unchanged: () => `${increaseSpace()}    ${elem.key}: ${stringify(elem.value)}`,
        child: () => `${increaseSpace()}    ${elem.key}: ${render(elem.children, depth + 2)}`,
      };
      return dispatcher[elem.type]();
    })).join('\n');
    return `{\n${formTree}\n${increaseSpace()}}`;
  };
  return `${render(astTree)}\n`;
};
