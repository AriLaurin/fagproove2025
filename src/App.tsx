import { TextComparator } from "./TextComparator";
import "./index.css";

import logo from "./logo.png";

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Logo" />
        <div className="header-text">
          <h1>Sammenlign Tekst</h1>
          <p className="subtitle">Sammenlign og analyser tekstforskjell med enkel og intuitiv brukergrensesnitt</p>
        </div>
      </header>
      <main className="app-main">
        <TextComparator />
      </main>
      <footer className="app-footer">
        <p>Bygget av Arijus Laurin</p>
      </footer>
    </div>
  );
}

export default App;
