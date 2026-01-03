import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loginpage from "./pages/Auth/Loginpage";
import Registerpage from "./pages/Auth/Registerpage";
import Notfoundpage from "./pages/Notfoundpage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Documentslistpage from "./pages/Documents/Documentslistpage";
import Documentsdetailspage from "./pages/Documents/Documentsdetailspage";
import Flashcardlistpage from "./pages/flashcards/Flashcardlistpage";
import Flashcardpage from "./pages/flashcards/Flashcardpage";
import Quiztaskpage from "./pages/Quizees/Quiztaskpage";
import Quizresultpage from "./pages/Quizees/Quizresultpage";
import Profilepage from "./pages/Profile/Profilepage";

const App = () => {
  const authenticated = true;
  const loading = false;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route element={<ProtectRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documentslistpage />} />
          <Route path="/documents/:id" element={<Documentsdetailspage />} />
          <Route path="/flashcards" element={<Flashcardlistpage />} />
          <Route path="/documents/:id/flashcards" element={<Flashcardpage />} />
          <Route path="/quizees/:quizId" element={<Quiztaskpage />} />
          <Route path="/quizees/:quizId/results" element={<Quizresultpage />} />
          <Route path="/profile" element={<Profilepage />} />
        </Route>

        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </Router>
  );
};

export default App;
