export const isIReactNode = (obj: any): obj is IReactNode => {
  return obj && "name" in obj && "props" in obj && "children" in obj;
};
