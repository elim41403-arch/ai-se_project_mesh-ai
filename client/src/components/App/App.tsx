import "./App.css"
import Intro from "../pages/Intro/Intro";
import KnowledgeBase from "../pages/KnowledgeBase/KnowledgeBase";
import Chat from "../pages/Chat/Chat";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Intro />}>
        </Route>
      <Route element={<AppLayout />}>
        <Route
          path="/knowledge"
          element={<KnowledgeBase />}>
          </Route>
        <Route
          path="/chat"
          element={<Chat />}>
          </Route>
      </Route>
    </Routes>
  );
}

export default App;