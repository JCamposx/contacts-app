import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AlertContextProvider } from "./context/AlertContext";
import { ContactContextProvider } from "./context/ContactContext";
import ContactsCreate from "./pages/contacts/Create";
import ContactsIndex from "./pages/contacts/Index";
import Home from "./pages/Home";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <AlertContextProvider>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.contacts.base} element={<ContactsIndex />} />
              <Route
                path={routes.contacts.create}
                element={
                  <ContactContextProvider>
                    <ContactsCreate />
                  </ContactContextProvider>
                }
              />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </AlertContextProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
