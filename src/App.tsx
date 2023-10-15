import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Loader from "./fragments/Loader";
const Members = lazy(() => import('./pages/Members/Members'))
// import Members from "./pages/Members/Members";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/anggota" element={
            <Suspense fallback={<Loader />}>
              <Members />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Wrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
export default App
