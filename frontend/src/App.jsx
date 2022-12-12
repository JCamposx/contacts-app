import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AlertContextProvider } from "./context/AlertContext";
import { ContactContextProvider } from "./context/ContactContext";
import { ContactRequestErrorContextProvider } from "./context/ContactRequestErrorContext";
import ContactsCreate from "./pages/contacts/Create";
import ContactsEdit from "./pages/contacts/Edit";
import ContactsIndex from "./pages/contacts/Index";
import Home from "./pages/Home";
import { routes, url } from "./routes/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <ContactRequestErrorContextProvider>
            <AlertContextProvider>
              <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route
                  path={routes.contacts.index}
                  element={<ContactsIndex />}
                />
                <Route
                  path={routes.contacts.create}
                  element={
                    <ContactContextProvider>
                      <ContactsCreate />
                    </ContactContextProvider>
                  }
                />
                <Route
                  path={url(routes.contacts.edit)}
                  element={<ContactsEdit />}
                />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </AlertContextProvider>
          </ContactRequestErrorContextProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
