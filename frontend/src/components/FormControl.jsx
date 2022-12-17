import Input from "@/components/Input";

export default function FormControl({
  id,
  label,
  inputType,
  inputValue,
  errorMessage,
  onInputChange,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Input
        id={id}
        type={inputType}
        value={inputValue}
        onChange={onInputChange}
        customClass={errorMessage ? "border-danger border-5" : ""}
      />
      <div id="emailHelp" className="form-text text-danger">
        {errorMessage}
      </div>
    </div>
  );
}
