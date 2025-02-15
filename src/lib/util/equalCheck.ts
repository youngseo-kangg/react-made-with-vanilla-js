const deepEqual = (obj1: any, obj2: any): boolean => {
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

const shallowEqual = (a: any, b: any): boolean => {
  if (Object.is(a, b)) return true; // 참조가 같으면 true

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false; // 원시값이거나 하나라도 null이면 false
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false; // 키 개수가 다르면 false

  return keysA.every((key) => b.hasOwnProperty(key) && Object.is(a[key], b[key]));
};

export { deepEqual, shallowEqual };
