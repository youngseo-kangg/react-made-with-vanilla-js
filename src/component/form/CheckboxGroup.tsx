interface ICheckboxGroupProps {
  label?: string; // 그룹 라벨 (선택 사항)
  options: string[]; // 체크박스 옵션 리스트
  selected: string[]; // 현재 선택된 옵션 리스트
  onChange: setState<string[]>; // 변경 핸들러
}

const CheckboxGroup: FC<ICheckboxGroupProps> = ({ label, options, selected, onChange }) => {
  const handleCheckboxChange = (option) => {
    if (selected.includes(option)) {
      // 선택한 요소가 있는 경우
      // 새로 업데이트 된 selected가 아니라 기존의 '[]' 값으로만 가지고 있어서 X...
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }

    // 아래처럼 selected가 아닌 prev로 처리하는 경우에는 잘 작동함
    // onChange((prev) => {
    //   if (prev.includes(option)) {
    //     return prev.filter((item) => item !== option);
    //   } else {
    //     return [...prev, option];
    //   }
    // });
  };

  return (
    <div className="checkbox-group">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selected.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
