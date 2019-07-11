import _ from 'lodash'

export default {
  buildPathWithSegments: (segments, newOperation) => {
    let path = '';
    if (segments.schema)
      path = `/schema/${encodeURIComponent(segments.schema)}`

    if (segments.type) {
      path = path + `/type/${encodeURIComponent(segments.type)}`
      if (segments.field) {
        path = path + `/field/${encodeURIComponent(segments.field)}`
        if (segments.argument) {
          path = path + `/argument/${encodeURIComponent(segments.argument)}`
        }
      }
    }
    if (newOperation)
      path = path + `/${newOperation}`
    else if (segments.operation)
      path = path + `/${segments.operation}`

    return path;
  },
  getPathSegments: (path) => {
    const segments = {};
    let key = '', id = '';
    path.split('/').forEach((segment, index, splits) => {
      if (_.isEmpty(key)) {
        key = segment
      } else if (_.isEmpty(id)) {
        id = decodeURIComponent(segment)
        segments[key] = id
        key = ''
        id = ''
      } else { //both are not empty, could be starting of sub segments or operation        
        if (index !== splits.length - 1) {
          key = segment
          id = ''
        }
      }
      // console.log(index, segment, key, id);
      if (!_.isEmpty(key) &&
        index === splits.length - 1) // last segment is operation (edit,new,search... or could be ID itself)
        segments.operation = segment;
    });
    return segments;
  }
};