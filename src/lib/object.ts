const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export const getObjectProperty = (value: object, key: string): unknown => {
  if (FORBIDDEN_KEYS.has(key)) {
    return undefined;
  }

  return Reflect.get(value, key);
};
