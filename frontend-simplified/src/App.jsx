import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {useState} from 'react'
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage"; 
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/add-job"
          element={
            isAuthenticated ? <AddJobPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            isAuthenticated ? <EditJobPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/jobs/:id"
          element={isAuthenticated ? <JobPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<LoginPage
        isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage
        isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
