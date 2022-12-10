import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AlertContextProvider } from "./context/AlertContext";
import { ContactContextProvider } from "./context/ContactContext";
import ContactsCreatePage from "./pages/contacts/Create";
import ContactsIndexPage from "./pages/contacts/Index";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <AlertContextProvider>
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
          </AlertContextProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
