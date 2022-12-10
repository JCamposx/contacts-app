import Input from "./Input";

export default function FormControl({
  id,
  label,
  inputType,
  inputValue,
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
      />
    </div>
  );
}
