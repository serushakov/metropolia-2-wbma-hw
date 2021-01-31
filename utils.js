export const getImageUrl = (fileName) =>
  `http://media.mw.metropolia.fi/wbma/uploads/${fileName}`;

export const extractValuesFromFields = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.value])
  );
