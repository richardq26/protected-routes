import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);
  const login = () => {
    // Simulación de login
    setUser({ id: 1, name: "John Doe", permissions: ["sinpermiso"], roles: ["admin"] });
  };

  const logout = () => setUser(null);
  return (
    <BrowserRouter>
      <Navigation />
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        {/* Los 2 ! lo convierten en booleano, si existe devuelve true */}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={!!user && user.roles.includes("admin")}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
