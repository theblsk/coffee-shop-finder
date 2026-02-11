export const getObjectProperty = (value: object, key: string): unknown => {
  return Reflect.get(value, key);
};
