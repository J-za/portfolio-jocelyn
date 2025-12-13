import { Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Layout from "../components/Layout/Layout";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Mentions from "../pages/Mentions/Mentions";
import Error from "../pages/Error/Error";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

//admin
import Login from "../pages/Admin/Login/Login";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Categories from "../pages/Admin/Categories/Categories";
import Skills from "../pages/Admin/Skills/Skills";
import Projects from "../pages/Admin/Projects/Projects";
import AdminLayout from "../components/AdminLayout/AdminLayout";

function Router() {
  return (
    <ScrollToTop>
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/projets" element={<Project />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="*" element={<Error />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="competences" element={<Skills />} />
          <Route path="projets" element={<Projects />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default Router;
