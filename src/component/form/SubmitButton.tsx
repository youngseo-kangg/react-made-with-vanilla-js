const SubmitButton = ({ onSubmit, disabled }) => {
  return (
    <button type="button" onClick={onSubmit} disabled={disabled}>
      제출하기
    </button>
  );
};

export default SubmitButton;
