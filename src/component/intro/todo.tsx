import { useState } from "@react/render";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState<Array<{ name: string; checked: boolean }>>([
    { name: "test1", checked: false },
    { name: "test2", checked: false }
  ]);
  const updateTodoChecked = (index: number) =>
    setTodoList((prev) =>
      prev.map((todo, idx) => (idx === index ? { ...todo, checked: !todo.checked } : todo))
    );

  return (
    <article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTodoList((prev) => [...prev, { name: newTodo, checked: false }]); // 새로운 항목 추가
          setNewTodo(""); // 입력 필드 리셋
        }}
      >
        <input value={newTodo} onChange={({ target: { value } }) => setNewTodo(value)} />
      </form>
      {todoList.map((el, idx) => (
        <li key={idx}>
          {el.name} /
          <input
            type="checkbox"
            checked={Boolean(el.checked)}
            onChange={() => updateTodoChecked(idx)}
          />
        </li>
      ))}
    </article>
  );
};

export default Todo;
