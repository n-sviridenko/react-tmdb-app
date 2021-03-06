import { syncHistoryWithStore } from 'react-router-redux';
import { getRootAsJS } from 'store/reducers/route';

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), makeSelectLocationState
// must be provided for resolving how to retrieve the "route" in the state
export default function syncHistory(history, store) {
  return syncHistoryWithStore(history, store, {
    selectLocationState: getRootAsJS,
  });
}
