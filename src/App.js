import { Routes, Route } from "react-router-dom";
import SearchScreen from "./components/BaseComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchScreen />} exact />
    </Routes>
  );
}

export default App;
