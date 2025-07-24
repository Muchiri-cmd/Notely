import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  Dashboard,
  HomePage,
  NotePage,
  UserProfile,
  Trash,
  BookMarks,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import { NoteForm } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <NoteForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trash"
          element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <BookMarks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
