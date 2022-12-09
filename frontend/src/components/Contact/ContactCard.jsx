export default function ContactCard({ name, description, phone_number }) {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{phone_number}</p>
        <div>
          <a href="#" className="btn btn-dark me-2">
            Edit
          </a>
          <a href="#" className="btn btn-danger">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
