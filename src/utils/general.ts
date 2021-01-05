export function getTypedObjectKeys<T>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}
