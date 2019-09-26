
const formatFieldTypeNullability = ({ type, customType, isList, isNonNull, isNonNullList }) => {
  let resType = type ? type : customType;
  if (isNonNull)
    resType = resType + '!';
  if (isList)
    resType = `[${resType}]`;
  if (isNonNullList)
    resType = resType + '!';
  return resType;
};

export { formatFieldTypeNullability };