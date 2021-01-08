export function getTypedObjectKeys<T>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

export function toRGBA(hexColor: string, opacity = 1): string {
  const hexCode = hexColor.slice(1, 7);

  const hexGroupedCodes: string[] = [];

  Array.from(hexCode).forEach((hexNumber, index) => {
    if (index % 2 === 0) {
      hexGroupedCodes.push(hexNumber);
      return;
    }

    const indexToBeAdded = Math.floor(index / 2);
    hexGroupedCodes[indexToBeAdded] += hexNumber;
  });

  const [redRGB, greenRGB, blueRGB] = hexGroupedCodes.map((code) =>
    parseInt(code, 16),
  );

  const colorAsRGBA = `rgba(${redRGB}, ${greenRGB}, ${blueRGB}, ${opacity})`;

  return colorAsRGBA;
}

export function serializeObject<Original, Result = any>(
  object: Original,
): Result {
  const serializedObject = JSON.parse(JSON.stringify(object));

  return serializedObject;
}
