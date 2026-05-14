import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import ProductListPage from "./pages/ProductListPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/product-list" element={<ProductListPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
