import * as schemas from 'store/schemas';
import paginatedLoaderCreator, {
  createRootSelector,
} from 'store/reducers/creators/paginatedLoader';
import listCreator, {
  createItemSelector,
} from 'store/reducers/creators/list';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from 'store/actions/keywords';

export default listCreator({
  itemReducerCreator: paginatedLoaderCreator,
  types: [
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
  ],
});

const getRawRoot = (state) => state.getIn(['keywords', 'search']);
const makeGetRawByQuery = (query) => createItemSelector(getRawRoot, query);
const makeGetByQuery = (query) => createRootSelector(makeGetRawByQuery(query), schemas.keyword);

export {
  makeGetByQuery,
};
