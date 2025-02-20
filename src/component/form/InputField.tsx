import { SyntheticEvent } from "@react/syntheticEvent";

interface IInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "email" | "number" | "tel" | "url"; // 확장 가능
  placeholder?: string;
}

const InputField: FC<IInputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder
}) => {
  // console.log("InputField props --->", { label, value, placeholder, onChange });

  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          console.log("onChange triggered", e); // ✅ 실행 여부 확인
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
