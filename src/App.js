import { Routes, Route } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BrandsPage />} />
      <Route path="/models/:brandId" element={<ModelsPage />} />
      <Route path="/models/:brandId/guitar/:modelId" element={<GuitarDetailsPage />} />
    </Routes>
  );
}