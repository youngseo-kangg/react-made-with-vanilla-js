const SubmitButton = ({ onSubmit, disabled }) => {
  return (
    <button type="button" onClick={(e) => onSubmit(e)} disabled={disabled}>
      제출하기
    </button>
  );
};

export default SubmitButton;
