import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactsIndexPage from "./pages/contacts/Index";
import ContactsCreatePage from "./pages/contacts/Create";
import routes from "./routes/routes";
import { ContactContextProvider } from "./context/ContactContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path={routes.home} element={<ContactsIndexPage />} />
            <Route
              path={routes.contacts.create}
              element={
                <ContactContextProvider>
                  <ContactsCreatePage />
                </ContactContextProvider>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
