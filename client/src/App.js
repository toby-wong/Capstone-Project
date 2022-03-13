import "./App.css";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout></Layout>} />
    </Routes>
  );
}

export default App;
