import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactIndexPage from "./pages/contact/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ContactIndexPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
