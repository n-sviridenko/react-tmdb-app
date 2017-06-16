import { schema } from 'normalizr';

import * as schemas from 'store/schemas';
import loaderCreator, {
  createRootSelector,
} from 'store/reducers/creators/loader';
import {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
} from 'store/actions/genres';

export default loaderCreator({
  types: [
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAILURE,
  ],
});

const getRawRoot = (state) => state.getIn(['genres', 'list']);
const getRoot = createRootSelector(getRawRoot, new schema.Array(schemas.genre));

export {
  getRoot,
};
