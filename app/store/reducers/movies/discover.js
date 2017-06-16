import * as schemas from 'store/schemas';
import paginatedLoaderCreator, {
  createRootSelector,
} from 'store/reducers/creators/paginatedLoader';
import {
  DISCOVER_REQUEST,
  DISCOVER_SUCCESS,
  DISCOVER_FAILURE,
} from 'store/actions/movies';

export default paginatedLoaderCreator({
  types: [
    DISCOVER_REQUEST,
    DISCOVER_SUCCESS,
    DISCOVER_FAILURE,
  ],
});

const getRawRoot = (state) => state.getIn(['movies', 'discover']);
const getRoot = createRootSelector(getRawRoot, schemas.movie);

export {
  getRoot,
};
