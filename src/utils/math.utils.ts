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
