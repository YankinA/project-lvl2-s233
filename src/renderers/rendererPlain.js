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
      const buildPathFile = (key) => {
        if (_.isEmpty(path)) {
          return key;
        }
        return `${path.join('.')}.${key}`;
      };

      const dispatcher = {
        changed: () => `  Property '${buildPathFile(elem.key)}' was updated. From ${stringifyValue(elem.value)} to ${stringifyValue(elem.newValue)}`,
        added: () => {
          const value = stringifyValue(elem.value);
          return `  Property '${buildPathFile(elem.key)}' was added with ${value === 'complex value' ? value : `value: ${value}`}`;
        },
        deleted: () => `  Property '${buildPathFile(elem.key)}' was removed`,
        child: () => {
          const children = elem.children.filter(item => item.type !== 'unchanged');
          return render(children, [...path, elem.key]);
        },
      };
      return dispatcher[elem.type]();
    })).join('\n');
    return formPlainList;
  };
  const filterAst = ast.filter(elem => elem.type !== 'unchanged');
  return `${render(filterAst)}\n`;
};
