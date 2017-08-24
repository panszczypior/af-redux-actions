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

module.exports = genActionCreators;
