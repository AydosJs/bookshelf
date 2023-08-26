import { Route, Routes } from "react-router-dom"
import BooksContainer from "./containers/books/BooksContainer"
import RegisterContainer from "./containers/auth/RegisterContainer"
import ProtectedRoute from "./providers/ProtectedRoute"
import AuthRoute from "./providers/AoutRoute"
import { Toaster } from 'react-hot-toast';
import NothingPage from "./containers/layout/NothingPage"
import SearchBooks from "./containers/books/SearchBooks"
import './App.css'
import theme from "./themes"
import { useAppSelector } from "./store/hooks"


function App() {
  const mode = useAppSelector(state => state.settings.mode)
  theme.palette.mode = mode
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<RegisterContainer />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BooksContainer />} />
          <Route path="/search-books" element={<SearchBooks />} />
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
