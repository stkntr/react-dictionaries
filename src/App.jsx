import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { Omikuji } from "./pages/Omikuji";
// import { Janken } from "./pages/Janken";
import { EnglishEnglish } from "./pages/English-English";
import { Urban } from "./pages/Urban";
// import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-center p-4">
        <h1 className="text-3xl font-bold">react dictionaries</h1>
      </header>
      <main className="max-w-5xl m-auto">
        <section>
          <ul className="text-center">
            {/* <li>
              <Link to="/omikuji">おみくじ</Link>
            </li>
            <li>
              <Link to="/janken">じゃんけん</Link>
            </li> */}
            <li>
              <Link to="/english-english">英英辞書</Link>
            </li>
            <li>
              <Link to="/urban">スラング辞書</Link>
            </li>
          </ul>
        </section>
        <hr className="mx-8 my-4" />

        <Routes>
          {/* <Route path="/omikuji" element={<Omikuji />} />
          <Route path="/janken" element={<Janken />} /> */}
          <Route path="/english-english" element={<EnglishEnglish />} />
          <Route path="/urban" element={<Urban />} />
        </Routes>

      </main>
    </BrowserRouter>
  );
};

export default App;
