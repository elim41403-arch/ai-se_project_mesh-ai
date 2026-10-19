import "./App.css"
import Intro from "../../pages/Intro/Intro";
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import Chat from "../../pages/Chat/Chat";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import { ProtectedRoute, PublicRoute } from "../ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Intro />}>
      </Route>
      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<Login />}>
        </Route>
        <Route
          path="/register"
          element={<Register />}>
        </Route>
      </Route>  
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/knowledge"
            element={<KnowledgeBase />}>
          </Route>
          <Route
            path="/chat"
            element={<Chat />}>
          </Route>
        </Route>  
      </Route>
    </Routes>
  );
}

export default App;