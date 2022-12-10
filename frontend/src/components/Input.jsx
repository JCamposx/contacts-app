export default function Input({
  id,
  type,
  placeholder,
  value,
  onChange,
  customClass,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`form-control ${customClass}`}
      onChange={onChange}
    />
  );
}
