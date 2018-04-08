import _ from 'lodash';

const astBuild = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const buildTree = keys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        const children = astBuild(obj1[key], obj2[key]);

        return { key, type: 'child', children };
      }
      if (obj1[key] !== obj2[key]) {
        return {
          key,
          type: 'changed',
          value: obj1[key],
          newValue: obj2[key],
        };
      }
      return { key, type: 'unchanged', value: obj2[key] };
    }

    if (_.has(obj1, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    return { key, type: 'added', value: obj2[key] };
  });

  return buildTree;
};

export default astBuild;
