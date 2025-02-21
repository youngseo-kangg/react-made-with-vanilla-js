import { useState } from "@react/render";

import InputField from "./component/form/InputField";
import RadioGroup from "./component/form/RadioGroup";
import CheckboxGroup from "./component/form/CheckboxGroup";
import SubmitButton from "./component/form/SubmitButton";

import "./styles/form.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [option, setOption] = useState("");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // name, email, ... 업뎃 안된 state로 찍힘
      console.log("name: ", name);
      console.log("email: ", email);
      console.log("phone: ", phone);
      console.log("option: ", option);
      console.log("checkboxes: ", checkboxes);
      console.log("description: ", description);

      const formData = {
        name,
        email,
        phone,
        option,
        checkboxes,
        description
      };
      console.log("Submitted Data:", JSON.stringify(formData, null, 2));
      alert("폼이 성공적으로 제출되었습니다!");
      setName("");
      setEmail("");
      setPhone("");
      setOption("");
      setCheckboxes([]);
      setDescription("");
    } catch (e) {
      console.log(e);
    }
  };

  const isFormValid = name && email.includes("@") && phone.match(/^\d{10,11}$/) && option;

  return (
    <div className="form-container">
      <h1>구글폼 클론</h1>
      <InputField label="이름" value={name} onChange={setName} placeholder="가나다" />
      <InputField
        label="이메일"
        value={email}
        onChange={setEmail}
        type="email"
        placeholder="example@gmail.com"
      />
      <InputField
        label="전화번호"
        value={phone}
        onChange={setPhone}
        type="tel"
        placeholder="01012345678"
      />
      <RadioGroup
        label="선호하는 옵션을 선택하세요"
        options={["옵션 1", "옵션 2", "옵션 3"]}
        selected={option}
        onChange={setOption}
      />
      <CheckboxGroup
        label="관심사를 선택하세요"
        options={["React", "Vue", "Angular"]}
        selected={checkboxes}
        onChange={setCheckboxes}
      />
      <InputField
        label="설명"
        value={description}
        onChange={setDescription}
        type="text"
        placeholder="추가 설명을 입력하세요"
      />
      <SubmitButton onSubmit={handleSubmit} disabled={!isFormValid} />
    </div>
  );
}

export default App;
