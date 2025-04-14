import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Books from "./components/Books";
import Add from "./components/Add";
import Update from "./components/Update";
import "./style.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Nav />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/add" element={<Add />} />
              <Route path="/update/:id" element={<Update />} />
            </Routes>
          </main>
          <ScrollToTop />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
