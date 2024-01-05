import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import ToasterProvider from "./components/layout/Toaster";

import { store } from "./reducers/store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import Loader from "./fragments/Loader";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UnauthorizedRoute from "./components/layout/UnauthorizedRoute";


const Members = lazy(() => import("./pages/Members/Members"));
const MemberDetails = lazy(() => import("./pages/MemberDetails/MemberDetails"));
const EditMember = lazy(() =>import("./pages/Admin/members/EditMember"));
const AddMember = lazy(() => import("./pages/Admin/members/AddMember"));
const Login = lazy(() => import("./pages/Admin/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));

function App() {
  return (
    <Provider store={store}>
      <ToasterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/anggota"
                element={
                  <Suspense fallback={<Loader />}>
                    <Members />
                  </Suspense>
                }
              />
              <Route
                path="/detail"
                element={
                  <Suspense fallback={<Loader />}>
                    <MemberDetails />
                  </Suspense>
                }
              />
              <Route element={<UnauthorizedRoute />}>
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Login />
                    </Suspense>
                  }
                />
              </Route>
              <Route element={<ProtectedRoute redirectPath="/login" />}>
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/add-member"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AddMember />
                    </Suspense>
                  }
                />
                <Route
                  path="/edit-member/:id"
                  element={
                    <Suspense fallback={<Loader />}>
                      <EditMember />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToasterProvider>
    </Provider>
  );
}

function Wrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
export default App;
