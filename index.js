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

const actionCreatorFn = (type, payload) => ({
  type,
  payload,
});

const genActionCreators = (creators) => (
  Object.keys(creators).reduce((acc, curr) => 
    Object.assign({}, acc, {
      [curr]: creators[curr].default
        ? (config = {}) => {
          const type = config.success === undefined // eslint-disable-line no-nested-ternary
            ? creators[curr].default
            : (config.success === true
              ? creators[curr].success
              : creators[curr].failure
            );

          const action = {
            type,
          };

          if (config.payload !== 'undefined') {
            action.payload = config.payload;
          }

          return action;
        }
        : actionCreatorFn.bind(null, creators[curr]),
    }), {})
);

const helpers = {
  genActionType,
  genActionCreators,
};

module.exports = helpers;
