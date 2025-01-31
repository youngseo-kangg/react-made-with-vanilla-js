import React from "../react";

const Item = ({ name, price, size, isVegetarian = false }: IPizza) => {
  return (
    <li data-size={size} class={`${name}_pizza`}>
      {name}
      {isVegetarian && " (vegan)"}
      {` ${price}원`}
    </li>
  );
};

export default Item;
