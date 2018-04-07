import _ from 'lodash';

export default (ast) => {
  const render = (tree, path = []) => {
    const result = _.flatten(tree.map((elem) => {
      const value = _.isObject(elem.value) ? 'complex value' : `value: '${elem.value}'`;
      const dispatcher = {
        changed: () => `Property '${path.join('.')}' was updated. From '${elem.value}' to '${elem.newValue}'`,
        added: () => `Property '${path.join('.')}' was added with ${value}`,
        deleted: () => `Property '${path.join('.')}' was removed,`,
        child: () => `${render(elem.children, [...path, value.name])}`,
      };
      return dispatcher[elem.type]();
    })).join('\n');
    return `{\n${result}\n}`;
  };
  return `${render(ast)}\n`;
};
