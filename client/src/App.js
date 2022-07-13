import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import MatchPage from "./Pages/MatchPage";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <>
    <Link to="/">
      <h1 className="title">
        Fotbal
      </h1>
    </Link>
      <Routes>
        <Route exact index element={<HomePage />} />

        <Route path="match/:id" element={<MatchPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
