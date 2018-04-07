import _ from 'lodash';

const astObject = (obj1, obj2) => {
  const joinArrays = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const joinObj = joinArrays.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        const children = astObject(obj1[key], obj2[key]);

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

  return joinObj;
};

export default astObject;
