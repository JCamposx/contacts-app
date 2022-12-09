import ContactList from "./components/Contact/ContactList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <ContactList />
      </div>
    </>
  );
}

export default App;
