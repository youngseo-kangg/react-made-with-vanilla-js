interface IRadioGroupProps {
  label: string;
  options: (string | number)[];
  selected: string | number;
  onChange: setState<string>;
}

const RadioGroup: FC<IRadioGroupProps> = ({ label, options, selected, onChange }) => {
  console.log(label, options, selected);

  return (
    <div className="radio-group">
      <label>{label}</label>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
