interface IPizza {
  name: string;
  ingredients?: string[];
  price?: number;
  size?: "small" | "medium" | "large";
  isVegetarian?: boolean;
}
