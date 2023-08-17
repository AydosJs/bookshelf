import { Route, Routes } from "react-router-dom"
import LoginContainer from "./containers/auth/LoginContainer"
import './App.css'
import RegisterContainer from "./containers/auth/RegisterContainer"
import BooksContainer from "./containers/books/BooksContainer"


function App() {

  return (
    <Routes>

      <Route >
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
      </Route>

      <Route >
        <Route path="/" element={<BooksContainer />} />
      </Route>

    </Routes>
  )
}

export default App
