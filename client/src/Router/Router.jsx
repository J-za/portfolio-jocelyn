import { Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Layout from "../components/Layout/Layout";
import About from "../pages/About/About";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
      </Route>
    </Routes>
  );
}

export default Router;
