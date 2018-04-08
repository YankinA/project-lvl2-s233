import _ from 'lodash';

export default (ast) => {
  const render = (tree, path = []) => {
    const formPlainList = _.flatten(tree.map((elem) => {
      const stringifyValue = (value) => {
        if (_.isObject(value)) {
          return 'complex value';
        }
        return `'${value}'`;
      };

      const stringifyValueAdded = (value) => {
        if (stringifyValue(value) !== 'complex value') {
          return `value: ${stringifyValue(value)}`;
        }
        return stringifyValue(elem.value);
      };

      const buildPathFile = (key) => {
        if (_.isEmpty(path)) {
          return key;
        }
        return `${path.join('.')}.${key}`;
      };

      const dispatcher = {
        changed: () => `  Property '${buildPathFile(elem.key)}' was updated. From ${stringifyValue(elem.value)} to ${stringifyValue(elem.newValue)}`,
        added: () => `  Property '${buildPathFile(elem.key)}' was added with ${stringifyValueAdded(elem.value)}`,
        deleted: () => `  Property '${buildPathFile(elem.key)}' was removed`,
        unchanged: () => 'unchanged',
        child: () => render(elem.children, [...path, elem.key]),
      };
      return dispatcher[elem.type]();
    })).filter(item => item !== 'unchanged').join('\n');
    return formPlainList;
  };
  return `${render(ast)}\n`;
};
