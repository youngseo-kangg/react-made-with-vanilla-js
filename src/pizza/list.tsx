import Item from "./item";
import React from "../react";

const PIZZA_LIST: IPizza[] = [
  {
    name: "cheese",
    ingredients: ["cheese", "tomato sauce"],
    price: 12000,
    size: "medium",
    isVegetarian: true
  },
  { name: "bulgogi", ingredients: ["bulgogi", "cheese", "onion"], price: 15000, size: "large" },
  {
    name: "pepperoni",
    ingredients: ["pepperoni", "cheese", "tomato sauce"],
    price: 14000,
    size: "large"
  },
  {
    name: "veggie",
    ingredients: ["mushroom", "olive", "onion", "bell pepper"],
    price: 13000,
    size: "medium",
    isVegetarian: true
  }
];

const List = () => {
  return (
    <>
      {PIZZA_LIST.map((pizzaItemProps) => (
        <Item {...pizzaItemProps} />
      ))}
    </>
  );
};

export default List;
