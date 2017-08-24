const defaultParams = {
  separator: '/',
  successPrefix: 'SUCCESS',
  failPrefix: 'FAIL',
  modulePrefix: '__',
};

const genActionType = (initialParams = {}) => {
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

    let result = '';

    if (prefix)
      result += prefix + separator;

    if (module)
      result += modulePrefix + module + separator;

    if (success === true)
      result += successPrefix + separator;
    else if (success === false)
      result += failPrefix + separator;

    result += type;

    if (postfix)
      result += postfix;

    return result;
  };
};

module.exports = genActionType;
