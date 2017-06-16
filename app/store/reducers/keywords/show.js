import * as schemas from 'store/schemas';
import itemReducerCreator, { createRootSelector } from 'store/reducers/creators/loader';
import listReducerCreator, { createItemSelector } from 'store/reducers/creators/list';
import { SHOW_REQUEST, SHOW_SUCCESS, SHOW_FAILURE } from 'store/actions/keywords';

export default listReducerCreator({
  itemReducerCreator,
  types: [
    SHOW_REQUEST,
    SHOW_SUCCESS,
    SHOW_FAILURE,
  ],
  requestPayloadMapper: (data, id) => id,
});

const getRoot = (state) => state.getIn(['keywords', 'show']);
const makeGetRawById = (id) => createItemSelector(getRoot, id);
const makeGetById = (id) => createRootSelector(makeGetRawById(id), schemas.keyword);

export {
  makeGetById,
};
