import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Omikuji } from "./pages/Omikuji";
import { Janken } from "./pages/Janken";
import { EnglishEnglish } from "./pages/English-English";
// import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-center">
        <h1 className="text-3xl font-bold">react app</h1>
      </header>
      <main>
        <ul className="text-center">
          <li>
            <Link to="/omikuji">おみくじ</Link>
          </li>
          <li>
            <Link to="/janken">じゃんけん</Link>
          </li>
          <li>
            <Link to="/english-english">英英辞書</Link>
          </li>
        </ul>
        <hr />
        <Routes>
          <Route path="/omikuji" element={<Omikuji />} />
          <Route path="/janken" element={<Janken />} />
          <Route path="/english-english" element={<EnglishEnglish />} />
        </Routes>

      </main>
    </BrowserRouter>
  );
};

export default App;
