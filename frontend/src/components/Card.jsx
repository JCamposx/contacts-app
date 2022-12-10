export default function Card({ title, customClass, children }) {
  return (
    <div className={`card border-dark ${customClass}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  );
}
