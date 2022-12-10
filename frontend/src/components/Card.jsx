export default function ContactCard({ title, customClass, children }) {
  return (
    <div className={`card text-center border-dark ${customClass}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  );
}
