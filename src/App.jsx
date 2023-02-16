import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { EnglishEnglish } from "./pages/English-English";
import { ChineseEnglish } from "./pages/Chinese-English";
import { Urban } from "./pages/Urban";
// import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-center p-4">
        <h1 className="text-2xl font-bold">React Dictionaries</h1>
      </header>
      <main className="max-w-5xl m-auto">
        <section>
          <ul className="text-center">
            <li>
              <Link to="/english-english">英英辞書</Link>
            </li>
            <li>
              <Link to="/chinese-english">中英辞書</Link>
            </li>
            <li>
              <Link to="/urban">Urban Dictionary</Link>
            </li>
          </ul>
        </section>
        <hr className="mx-8 my-4" />

        <Routes>
          <Route path="/english-english" element={<EnglishEnglish />} />
          <Route path="/chinese-english" element={<ChineseEnglish />} />
          <Route path="/urban" element={<Urban />} />
        </Routes>

      </main>
    </BrowserRouter>
  );
};

export default App;
