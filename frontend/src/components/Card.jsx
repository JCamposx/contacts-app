export default function ContactCard({ children }) {
  return (
    <div className="card text-center">
      <div className="card-body">{children}</div>
    </div>
  );
}
