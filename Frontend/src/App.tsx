
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Placeholder from "./pages/Placeholder";
import Desktops from "./pages/Desktops"
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Placeholder />} />
          <Route path="desktops" element={<Desktops />} />
          <Route path="devices" element={<Placeholder />} />
          <Route path="locations" element={<Placeholder />} />
          <Route path="hynex" element={<Placeholder />} />
          <Route path="reports" element={<Placeholder />} />
          <Route path="users" element={<Placeholder />} />
          <Route path="settings" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
