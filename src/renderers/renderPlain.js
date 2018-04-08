import _ from 'lodash';

export default (ast) => {
  const render = (tree, path = []) => {
    const result = _.flatten(tree.map((elem) => {
      const stringifyValue = (value) => {
        if (_.isObject(value)) {
          return 'complex value';
        }
        return `'${value}'`;
      };

      const addedValue = (value) => {
        if (stringifyValue(value) !== 'complex value') {
          return `value: ${stringifyValue(value)}`;
        }
        return stringifyValue(elem.value);
      };

      const pathFile = (key) => {
        if (_.isEmpty(path)) {
          return key;
        }
        return `${path.join('.')}.${key}`;
      };

      const dispatcher = {
        changed: () => `  Property '${pathFile(elem.key)}' was updated. From ${stringifyValue(elem.value)} to ${stringifyValue(elem.newValue)}`,
        added: () => `  Property '${pathFile(elem.key)}' was added with ${addedValue(elem.value)}`,
        deleted: () => `  Property '${pathFile(elem.key)}' was removed`,
        unchanged: () => 'unchanged',
        child: () => render(elem.children, [...path, elem.key]),
      };
      return dispatcher[elem.type]();
    })).filter(item => item !== 'unchanged').join('\n');
    return result;
  };
  return `${render(ast)}\n`;
};
