export default function ContactCard({ title, children }) {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  );
}
