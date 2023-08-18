import { Route, Routes } from "react-router-dom"
import BooksContainer from "./containers/books/BooksContainer"
import RegisterContainer from "./containers/auth/RegisterContainer"
import ProtectedRoute from "./providers/ProtectedRoute"
import AuthRoute from "./providers/AoutRoute"
import { Toaster } from 'react-hot-toast';
import './App.css'
import NothingPage from "./containers/layout/NothingPage"


function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<RegisterContainer />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BooksContainer />} />
        </Route>

        <Route
          path="*"
          element={<NothingPage />}
        />
      </Routes>

      {/* lightweight notifications */}
      <div id="taost-wrapper">
        <Toaster position="top-center" />
      </div>
    </>
  )
}

export default App
