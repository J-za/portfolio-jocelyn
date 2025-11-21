import { Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Layout from "../components/Layout/Layout";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Mentions from "../pages/Mentions/Mentions";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

function Router() {
  return (
    <ScrollToTop>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/projets" element={<Project />} />
          <Route path="/mentions" element={<Mentions />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default Router;
