// const
import PIZZA_LIST from "src/const/pizza";

// component
import Item from "./item";

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
