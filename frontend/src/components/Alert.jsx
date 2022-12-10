export default function Alert({ type, children }) {
  return (
    <div
      className={`alert alert-dismissible fade show alert-${type}`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
