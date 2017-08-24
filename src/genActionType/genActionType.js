const defaultParams = {
  separator: '/',
  successPrefix: 'SUCCESS',
  failPrefix: 'FAIL',
  modulePrefix: '__',
};

const genActionType = (
  initialParams = {}
) => {
  const newInitialParams = Object.assign(defaultParams, initialParams);

  return (type, params) => {
    const newParams = Object.assign(newInitialParams, params);

    const {
      success,
      prefix,
      postfix,
      module,
      separator,
      successPrefix,
      failPrefix,
      modulePrefix,
    } = newParams;

    return (
      `${prefix
        ? prefix + separator
        : ''
      }${module
        ? modulePrefix + module + separator
        : ''
      }${success === true // eslint-disable-line no-nested-ternary
        ? successPrefix + separator
        : (success === false
          ? failPrefix + separator
          : '')
      }${type}${postfix || ''}`
    );
  };
};

module.exports = genActionType;
