export const clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
};

export const maxOfArray = <T>(arr: T[], compareProperty: (item: T) => number): T => {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }

  return arr.reduce((max, item) => {
    const propertyValue = compareProperty(item);
    return propertyValue > compareProperty(max) ? item : max;
  }, arr[0]);
};

export const minOfArray = <T>(arr: T[], compareProperty: (item: T) => number): T => {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }

  return arr.reduce((min, item) => {
    const propertyValue = compareProperty(item);
    return propertyValue < compareProperty(min) ? item : min;
  }, arr[0]);
};

export const randomRand = (min: number, max: number): number => {
  if (min >= max) {
    throw new Error("Min must be less than Max");
  }
  return Math.random() * (max - min) + min;
};

export const sortArray = <T>(
  arr: T[],
  sortProperty: (item: T) => any,
  sortOrder: "asc" | "desc" = "asc",
): T[] => {
  const compareFunction =
    sortOrder === "asc" ? (a: any, b: any) => a - b : (a: any, b: any) => b - a;

  return arr.slice().sort((a, b) => {
    const valueA = sortProperty(a);
    const valueB = sortProperty(b);

    const dateA = valueA instanceof Date ? valueA.getTime() : valueA;
    const dateB = valueB instanceof Date ? valueB.getTime() : valueB;

    return compareFunction(dateA, dateB);
  });
};
