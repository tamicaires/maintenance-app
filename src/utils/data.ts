export function getDataOrDefault<T>(obj: any, defaultValue: T, path?: string,): T {
  if (!path) {
    return obj ?? defaultValue;
  }

  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? defaultValue;
}