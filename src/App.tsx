import { Route, Routes } from "react-router-dom"
import BooksContainer from "./containers/books/BooksContainer"
import LoginContainer from "./containers/auth/LoginContainer"
import RegisterContainer from "./containers/auth/RegisterContainer"
import ProtectedRoute from "./providers/ProtectedRoute"
import AuthRoute from "./providers/AoutRoute"
import './App.css'


function App() {

  return (
    <Routes>

      <Route element={<AuthRoute />}>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<BooksContainer />} />
      </Route>

    </Routes>
  )
}

export default App
