import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Loader from "./fragments/Loader";
const Members = lazy(() => import('./pages/Members/Members'))
const MemberDetails = lazy(() => import('./pages/MemberDetails/MemberDetails'))
const Login = lazy(() => import("./pages/Admin/Login"))
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"))

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
          <Route path='detail' element={
            <Suspense fallback={<Loader />}>
              <MemberDetails />
            </Suspense>
          } />
          <Route path='login' element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          } />
          <Route path='dashboard' element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
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
