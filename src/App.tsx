import { Route, Routes } from "react-router-dom"
import BooksContainer from "./containers/books/BooksContainer"
import RegisterContainer from "./containers/auth/RegisterContainer"
import ProtectedRoute from "./providers/ProtectedRoute"
import AuthRoute from "./providers/AoutRoute"
import './App.css'


function App() {

  return (
    <Routes>

      <Route element={<AuthRoute />}>
        <Route path="/register" element={<RegisterContainer />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<BooksContainer />} />
      </Route>

    </Routes>
  )
}

export default App
