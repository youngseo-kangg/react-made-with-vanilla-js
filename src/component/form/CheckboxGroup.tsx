interface ICheckboxGroupProps {
  label?: string; // 그룹 라벨 (선택 사항)
  options: string[]; // 체크박스 옵션 리스트
  selected: string[]; // 현재 선택된 옵션 리스트
  onChange: setState<string[]>; // 변경 핸들러
}

const CheckboxGroup: FC<ICheckboxGroupProps> = ({ label, options, selected, onChange }) => {
  const handleCheckboxChange = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
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
