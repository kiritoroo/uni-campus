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
