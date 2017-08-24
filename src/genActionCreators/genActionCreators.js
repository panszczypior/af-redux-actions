const actionCreatorFn = (type, payload) => {
  const action = { type };

  if (payload)
    action.payload = payload;

  return action;
};

const genActionCreators = (creators) => {
  const creatorsKeys = Object.keys(creators);

  return creatorsKeys.reduce((acc, curr) => {
    let result = (...args) => actionCreatorFn(creators[curr], ...args);

    if (
      typeof creators[curr] === 'object' &&
      !Array.isArray(creators[curr]) &&
      creators[curr].default
    ) {
      result = (config) => {
        let payload;
        let type = creators[curr].default;

        if (typeof config === 'object' && !Array.isArray(config)) {
          payload = config.payload;

          if (config.success === true)
            type = creators[curr].success;
          else if (config.success === false)
            type = creators[curr].failure;
        } else
          payload = config;

        const action = {
          type,
        };

        if (payload !== undefined)
          action.payload = payload;

        return action;
      };
    }

    return Object.assign({}, acc, { [curr]: result })
  }, {});
};

module.exports = genActionCreators;
