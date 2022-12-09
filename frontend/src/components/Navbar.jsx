export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/logo.png"
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block"
            style={{ marginInlineEnd: "5px" }}
          />
          Contacts App
        </a>
      </div>
    </nav>
  );
}
