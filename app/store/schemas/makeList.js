import { schema } from 'normalizr';

function makeList(itemSchema) {
  return {
    results: new schema.Array(itemSchema),
  };
}

export default makeList;
