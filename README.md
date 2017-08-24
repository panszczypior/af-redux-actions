# af-redux-actions

utility functions for redux actions and action creators

Example usage

```javascript
/* eslint-disable no-multi-spaces */

import {
  genActionType,
  genActionCreators,
} from 'af-redux-actions';

const genApiActions              = genActionType({ module: 'api' });

const API_CALL_REQUESTED         = genApiActions('API_CALL_REQUESTED');
const SUCCESS_API_CALL_REQUESTED = genApiActions('API_CALL_REQUESTED', { success: true });
const FAIL_API_CALL_REQUESTED    = genApiActions('API_CALL_REQUESTED', { success: false });

const actionCreators = {
  call: {
    default: API_CALL_REQUESTED,
    success: SUCCESS_API_CALL_REQUESTED,
    failure: FAIL_API_CALL_REQUESTED,
  },
};

const api = genActionCreators(actionCreators);

export {
  api as default,

  API_CALL_REQUESTED,
  SUCCESS_API_CALL_REQUESTED,
  FAIL_API_CALL_REQUESTED,
};
```
