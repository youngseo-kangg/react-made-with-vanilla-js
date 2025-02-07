export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (obj1 === null || obj2 === null) return false;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 === "object" || typeof obj1 === "function") {
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((item, index) => deepEqual(item, obj2[index]));
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => keys2.includes(key) && deepEqual(obj1[key], obj2[key]));
  }

  return obj1 === obj2;
};
